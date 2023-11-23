import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@openzeppelin/hardhat-upgrades";

import "hardhat-jest";
import { HardhatUserConfig } from "hardhat/config";

const BLAST_API_KEY = process.env.BLAST_API_KEY || "";
const SHIBUYA_PRIVATE_KEY = process.env.SHIBUYA_PRIVATE_KEY || "";
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "";
const ASTAR_PRIVATE_KEY = process.env.ASTAR_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      evmVersion: "shanghai",
    },
  },
  defaultNetwork: "local",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    local: {
      url: "http://127.0.0.1:8545/",
      chainId: 1337,
    },
    sepolia: {
      url: `https://eth-sepolia.blastapi.io/${BLAST_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    shibuya: {
      url: `https://shibuya.blastapi.io/${BLAST_API_KEY}`,
      chainId: 81,
      accounts: [SHIBUYA_PRIVATE_KEY],
    },
    astar: {
      url: `https://astar.blastapi.io/${BLAST_API_KEY}`,
      chainId: 592,
      accounts: [ASTAR_PRIVATE_KEY],
    },
  },
};

export default config;
