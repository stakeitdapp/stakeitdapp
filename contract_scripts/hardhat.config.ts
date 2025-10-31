import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const PRIVATE_KEY = process.env.MY_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hederaTestnet: {
      url: "https://testnet.hashio.io/api",
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
