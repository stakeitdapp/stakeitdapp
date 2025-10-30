STAKE-IT DECENTRALIZED APPLICATION

A fully decentralized implementation for the StakeIt Web3 accountability platform on Hedera.

Architecture Overview
The StakeIt backend is built on a decentralized architecture using only:

Smart Contract: StakeIt.sol - Core staking and voting logic on Hedera
IPFS Integration: Decentralized proof storage
HCS Integration: Timestamping service for proof submissions
Components
1. Smart Contract (contracts/StakeIt.sol)
The main Solidity contract deployed on Hedera Smart Contract Service (HSCS):

Goal Creation: Users stake HBAR on personal goals
Voting System: Community votes on goal completion daily
Proof Submission: IPFS hashes for completion evidence
Finalization: Decentralized goal completion with penalty distribution
Security: ReentrancyGuard, AccessControl, Pausable functionality
2. IPFS Integration
Handles decentralized file storage:

File Upload: Proof documents and images to IPFS
Pinata Integration: Reliable pinning service
Fallback Support: Local IPFS node support
Metadata Storage: JSON data for additional context
3. HCS Integration
Hedera Consensus Service integration:

Topic Creation: Dedicated channels for timestamping
Message Submission: Immutable proof timestamps
Verification: Timestamp validation for submitted proofs
Query Support: Historical timestamp retrieval
