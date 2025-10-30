// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract StakeIt is AccessControl, ReentrancyGuard, Pausable {
    using ECDSA for bytes32;

    // Admin can pause/unpause, manage oracles and perform emergency actions
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    // Oracle signs final attestations
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    // Immutable treasury addresses
    address public immutable charityWallet;
    address public immutable platformWallet;
    address public immutable liquidityReserve;

    // Economic/ timing constants
        // Stake constants
    uint256 public constant MIN_STAKE = 1 * 10**8;
    uint256 public constant MAX_STAKE = 100 * 100**8;
        // Duration constants
    uint256 public constant MIN_DURATION = 7;
    uint256 public constant MAX_DURATION = 30;
        // Voter's stake constant
    uint256 public constant VOTER_STAKE = 10**7;
        // Penalty percents
    uint256 public constant PLATFORM_FEE_PERCENT = 1;
    uint256 public constant PENALTY_PERCENT = 25;
    
    // Point system
    uint256 public constant VOTE_POINT = 10;
    uint256 public constant COMLETION_POINT = 50;

    // Dispute window after finalization
    uint256 public constant DISPUTE_WINDOW = 24 hours;

    // Auto-incrementin goal id
    uint256 public nextGoalId = 1;

    mapping(address => bool) public hasActiveGoal;
    mapping(address => uint256) public withdrawable;
     // Per voter per goal bitmask to prevent duplicate votes for same day
    mapping(address => mapping(uint256 => uint256)) public voterVoteBitmask;
    mapping(address => mapping(uint256 => uint256)) public voterStakes;
    mapping(address => uint256) public userPoints;
    mapping(bytes32 => bool) public usedAttestation;

    // Initialize contract and set up admin roles and treasury wallets
    constructor(address _platform, address _charity, address _liquidity) {
        require(_platform != address(0) && _charity != address(0) && _liquidity != address(0), "zero address");
        platformWallet = _platform;
        charityWallet = _charity;
        liquidityReserve = _liquidity;

        // Set up roles: deployer is default admin and aadmin
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        // Admin role manages the Oracle role
        _setRoleAdmin(ORACLE_ROLE, ADMIN_ROLE);
    }

    //Goal model and storage
    struct Goal {
        uint256 id;
        address payable creator;
        uint256 stake;
        uint32 durationDays;
        uint64 startTime;
        bool isActive;
        bool isFinalized;
        bool isCompleted;
        uint64 finalizedTime;
        uint256 dailyVerifiedBitmask;
    }

    // Mapping of goalId to the Goal struct
    mapping(uint256 => Goal) public goals;

    // Event emitted when a goal is created
    event GoalCreated(uint256 indexed goalId, address indexed creator, uint256 stake, uint32 durationDays, uint64 startTime);
    event VoteCast(address indexed voter, uint256 indexed goalId, uint256 day, bool isValid);
    event PointsAwarded(address indexed user, uint256 points, string reason);
    event GoalFinalized(uint256 indexed goalId, address indexed user, bool success, uint256 hcsMessageId);
    event FundsDistributed(uint256 indexed goalId, address indexed user, bool success, uint256 amountReturned, uint256 charityShare, uint256 platformShare, uint256 liquidityShare);
    event Withdrawn(address indexed user, uint amount);
    event StakeRefunded(address indexed voter, uint256 indexed goalId, uint256 amount);


    // Functio to create goal by staking
    function createGoal(uint32 _durationDays, bytes32 /* _descriptiveHash */) external payable whenNotPaused returns (uint256) {
        require(!hasActiveGoal[msg.sender], "Active goal");
        require(_durationDays >= MIN_DURATION && _durationDays <= MAX_DURATION, "Duration out of range");
        require(msg.value >= MIN_STAKE && msg.value <= MAX_STAKE, "Stake out of range");

        // Compute platform fee and net stake
        uint256 fee = (msg.value * PLATFORM_FEE_PERCENT) / 100;
        uint256 netStake = msg.value - fee;
        withdrawable[platformWallet] += fee;

        // Create goal record
        uint256 goalId = nextGoalId++;
        goals[goalId] = Goal({
            id: goalId,
            creator: payable(msg.sender),
            stake: netStake,
            durationDays: _durationDays,
            startTime: uint64(block.timestamp),
            isActive: true,
            isFinalized: false,
            isCompleted: false,
            finalizedTime: 0,
            dailyVerifiedBitmask: 0
        });

        //mark that the user has an active goal
        hasActiveGoal[msg.sender] = true;

        emit GoalCreated(goalId, msg.sender, netStake, _durationDays, uint64(block.timestamp));
        return goalId;

    }

   
    
    // Function to cast aa vote for a specific goal/day, enforces the exact voter stake also
    function castVote(uint256 goalId, uint256 day, bool isValid) external payable whenNotPaused {
        Goal storage g = goals[goalId];
        require(g.isActive, "Goal not active");
        require(!g.isFinalized, "Already finalized");
        require(msg.value == VOTER_STAKE, "incorrect voter stake");
        require(block.timestamp >= g.startTime, "Goal not stared");
        uint256 currentDay = (block.timestamp - uint256(g.startTime)) / 1 days;
        require(currentDay < g.durationDays, "Voting period over");
        require(day == currentDay, "Must vote for current day");
        uint256 bitmap = voterVoteBitmask[msg.sender][goalId];
        require((bitmap & (1 << day)) == 0, "Already voted today on this goal");
        voterVoteBitmask[msg.sender][goalId] = bitmap | (1 << day);
        voterStakes [msg.sender][goalId] += msg.value;

        if (isValid) {
            userPoints[msg.sender] += VOTE_POINT;
            emit PointsAwarded(msg.sender, VOTE_POINT, "Valid vote");
        }

        emit VoteCast(msg.sender, goalId, day, isValid);
        

    }

    // Distribute penalty share and credit withdrawable balances for a failed goal
    function _distributeFailure(uint256 goalId, address creator, uint256 stake) internal {
        uint256 penalty = (stake * PENALTY_PERCENT) / 100;
        uint256 returnAmount = stake - penalty;

        uint256 charityShare = (penalty * 70) / 100;
        uint256 platformShare = (penalty * 20) / 100;
        uint256 liquidityShare  = penalty - charityShare - platformShare;

        withdrawable[creator] += returnAmount;
        withdrawable[charityWallet] += charityShare;
        withdrawable[platformWallet] += platformShare;
        withdrawable[liquidityReserve] += liquidityShare;

        emit FundsDistributed(goalId, creator, false, returnAmount, charityShare, platformShare, liquidityShare);
    }

    // Fuction to finalize a goal using an offchain tally(HCS aggregator)
    function finalizeGoal(uint256 goalId, uint256 hcsMessageId, bytes calldata tallyPayload, bytes calldata tallysig) external  whenNotPaused nonReentrant {
        Goal storage g = goals[goalId];
        require(g.isActive, "Goal not active");
        require(!g.isFinalized, "already finalized");
        require(block.timestamp >= uint256(g.startTime) + uint256(g.durationDays) * 1 days, "not ready");

        // attestation hash exactly as aggregator must do
        bytes32 attHash = keccak256(abi.encode(address(this), goalId, hcsMessageId, tallyPayload));
        // recover signer
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", attHash));
        address signer = ECDSA.recover(ethSignedHash, tallysig);
        require(hasRole(ORACLE_ROLE, signer), "invalid oracle");
        require(!usedAttestation[attHash], "attestation used");
        require(tallyPayload.length >= 32, "payload too short");

        // parse bitmask
        uint256 bitmask = abi.decode(tallyPayload, (uint256));
        usedAttestation[attHash] = true;

        bool success = true;
        for (uint256 day = 0; day < g.durationDays; day++) {
            if ((bitmask & (1 << day)) == 0) {
                success = false;
            } else {
                g.dailyVerifiedBitmask |= (1 << day);
            }
        }

        // update state before economic effects
        g.isActive = false;
        g.isFinalized = true;
        g.isCompleted = success;
        g.finalizedTime = uint64(block.timestamp);
        hasActiveGoal[g.creator] = false;

        emit GoalFinalized(goalId, g.creator, success, hcsMessageId);

        // distribute funds using pull pattern
        if (success) {
            withdrawable[g.creator] += g.stake;
            userPoints[g.creator] += COMLETION_POINT;
            emit PointsAwarded(g.creator, COMLETION_POINT, "Goal success");
            emit FundsDistributed(goalId, g.creator, true, g.stake, 0, 0, 0);
        } else {
            _distributeFailure(goalId, g.creator, g.stake);
        }
    }

    // function to withdraw any credited amount
    function withdraw() external nonReentrant {
        uint256 amount = withdrawable[msg.sender];
        require(amount > 0, "no funds to withdraw");

        withdrawable[msg.sender] = 0;
        (bool ok, ) = payable(msg.sender).call{value: amount}("");
        require(ok, "withdraw transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    // function to refund the voter's deposited stake
    function refundVoterStake(uint256 goalId) external nonReentrant {
        require(goals[goalId].isFinalized, "goal not finalized");
        uint256 stake = voterStakes[msg.sender][goalId];
        require(stake > 0, "no voter stake to refund");
        (bool ok, ) = payable(msg.sender).call{value: stake}("");
        require(ok, "refund transfer failed");
        emit StakeRefunded(msg.sender, goalId, stake);

    }

    // compute the attestation hash off-chain signers must sign
    function computeAttestationHash(
        uint256 goalId,
        uint256 hcsMessageId,
        bytes calldata tallyPayload
    ) external view returns (bytes32) {
        return keccak256(abi.encode(address(this), goalId, hcsMessageId, tallyPayload));
    }
}
