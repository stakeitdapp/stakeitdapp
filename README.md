# StakeIt DApp

## Fully‑decentralised staking & accountability platform on the HBAR / Hedera Hashgraph ecosystem

---

## 📌 Table of Contents

- [StakeIt DApp](#stakeit-dapp)
  - [Fully‑decentralised staking \& accountability platform on the HBAR / Hedera Hashgraph ecosystem](#fullydecentralised-staking--accountability-platform-on-the-hbar--hedera-hashgraph-ecosystem)
  - [📌 Table of Contents](#-table-of-contents)
  - [Overview](#overview)
  - [Key Features](#key-features)
  - [Architecture](#architecture)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
  - [Smart Contract \& On‑Chain Logic](#smart-contract--onchain-logic)
  - [Directory Structure](#directory-structure)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

---

## Overview

StakeIt DApp is a decentralised application built to help users stake HBAR on personal goals, create accountability through community voting, and submit proof of goal completion via IPFS and Hedera Consensus Service (HCS). It’s designed so that when a user stakes HBAR on a goal, the community can vote daily on whether the goal is being upheld; proof documents (images, videos, etc) are pinned to IPFS and timestamps submitted to HCS. If the goal is successfully completed, the user wins; if not, the staked amount is subject to penalties (or redistributed) according to the contract logic.

---

## Key Features

- ✅ **Goal Creation & Staking**: Users can create a goal, stake HBAR as collateral, and set parameters (duration, amount, etc).
- 🗳 **Community Voting**: Other users can vote daily on whether the goal is on‑track.
- 📂 **Proof Submission**: Users submit evidence (images, docs) to IPFS.
- 🕒 **Immutable Timestamping**: Proofs are timestamped via HCS for verifiable, tamper‑resistant proof of submission.
- 🔐 **Smart Contract Logic**: Core logic in Solidity handles staking, voting, finalisation, penalties and access control.
- 🌐 **Decentralised Storage & Consensus**: Uses IPFS + HCS so no central server controls proof or timestamps.

---

## Architecture

Here’s a high‑level overview of how components work together:

1. **Smart Contract** (found in `contracts/StakeIt.sol`)

   - Deploys on Hedera Smart Contract Service (HSCS).
   - Handles goal lifecycle: create → stake → voting → proof submission → finalise.
   - Includes security features: ReentrancyGuard, AccessControl, Pausable functionality.

2. **IPFS Integration**

   - Proof uploads (images, documents) are pinned (e.g., via Pinata) and the resulting IPFS hash is stored.
   - Option to use a local IPFS node fallback.
   - Metadata (JSON) for each proof includes context (e.g., description, timestamp, user).

3. **HCS (Hedera Consensus Service) Integration**

   - A dedicated topic is created for each goal or a global topic is used to timestamp proofs.
   - Messages submitted create immutable timestamp entries.
   - Retrieval of historical timestamps allowed for verification.

4. **Frontend / Client App** (found in `src/`, `public/`)
   - Built with TypeScript, React (or similar).
   - Tailwind CSS for styling (`tailwind.config.ts`).
   - Vite as build tool (`vite.config.ts`).
   - Users connect wallet, stake HBAR, create goals, submit proof, view voting results and finalisations.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- An HBAR wallet (for test networks or mainnet)
- Access to Hedera testnet / smart‑contract service
- (Optional) IPFS node or Pinata account for pinning proofs

### Installation

```bash
git clone https://github.com/stakeitdapp/stakeitdapp.git
cd stakeitdapp
npm install
```

### Running the App

1. Deploy the smart contract (check `contract_scripts/` for deployment scripts)
2. Configure `.env` with your Hedera credentials, network, contract address, IPFS settings
3. Run the frontend development server

```bash
npm run dev
```

4. Open your browser to `http://localhost:3000` (or whatever port)
5. Connect your wallet, stake HBAR, set a goal, submit proofs, etc.

---

## Smart Contract & On‑Chain Logic

- The contract `StakeIt.sol` implements:
  - Goal creation with required stake.
  - Voting mechanism: community votes whether the goal is being met.
  - Submission of proof by user: IPFS hash is logged, HCS timestamp is recorded.
  - Finalisation logic: decides if user wins or loses stake based on votes + proof.
  - Penalty and reward logic: stake deposit redistributed or returned.
  - Security patterns: ReentrancyGuard, AccessControl (who can call certain functions), Pausable (emergency stop).

---

## Directory Structure

```
.
├── contract_scripts/      # Deployment scripts, migrations, etc
├── contracts/             # Smart contract code (Solidity)
│   └── StakeIt.sol
├── public/                # Static frontend assets
├── src/                   # Frontend application (TypeScript)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md              # (You are here)
```

---

## Usage

- **Create a goal**: specify amount of HBAR to stake, the goal description, duration, maybe voting parameters.
- **Stake HBAR**: The user deposits HBAR into the contract to secure their commitment.
- **Community votes**: On a schedule (e.g., daily), community members can vote on whether the goal is still being adhered to.
- **Submit proof**: User uploads evidence (photos, docs) which gets pinned to IPFS, and a timestamp is submitted to HCS.
- **Finalise**: At the end of the period or when conditions met, contract logic determines success or failure — either returning stake + reward or enforcing a penalty.
- **View history**: UI shows goal history, vote history, proof IPFS links, timestamp data.

---

## Contributing

Contributions are very welcome! Here are some suggestions how you can contribute:

- Submit bug reports or feature requests via GitHub Issues
- Fork the repository, make your changes in a feature branch, then submit a pull request
- Ensure you follow consistent coding style, include tests where applicable
- Update documentation appropriately when changes are made

---

## License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

---

## Contact

Project maintained by:

- Engr. Computer J. (labaski)
- Adenuga Matthew (CodeLord36)
- Emmanuel Adeoye (Adeolu5678)

For questions or support, feel free to open an issue or email [stakeitdapp@gmail.com]

---

Thank you for checking out **StakeIt DApp** — a decentralised way to stake your goals and get community‑driven accountability.

---

_Prepared on 2025‑10‑30_
