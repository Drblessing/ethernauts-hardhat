import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import dotenv from 'dotenv';
dotenv.config();

const SEPOLIA_RPC =
  process.env.INFURA_SEPOLIA ||
  'https://ethereum-sepolia.blockpi.network/v1/rpc/public';

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      forking: {
        url: SEPOLIA_RPC,
        blockNumber: 3138132,
      },
    },

    mumbai: {
      // url: process.env.INFURA_MUMBAI,
      url: 'https://rpc.ankr.com/polygon_mumbai',
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.INFURA_SEPOLIA,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.19',
      },
      {
        version: '0.8.12',
      },
      {
        version: '0.6.12',
      },
      {
        version: '0.5.17',
      },
    ],
  },
};

export default config;
