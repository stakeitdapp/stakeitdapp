import dotenv from "dotenv";
dotenv.config();

export const config = {
  hederaNetwork: process.env.HEDERA_NETWORK || "testnet",
  operatorId: process.env.OPERATOR_ID,
  operatorKey: process.env.OPERATOR_KEY,
  contractAddress: process.env.CONTRACT_ADDRESS,
  // Add other config values as needed
};
