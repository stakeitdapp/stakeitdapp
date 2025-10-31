import {
  Client,
  AccountId,
  PrivateKey,
  Hbar,
  AccountBalanceQuery,
} from "@hashgraph/sdk";

/**
 * Creates and returns a configured Hedera Client for testnet or mainnet.
 * Loads credentials from environment

