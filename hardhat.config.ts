import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import dotenv from 'dotenv';
dotenv.config();
declare var process: {
  env: {
    PRIVATE_KEY: string;
    POLYGONSCAN_API_KEY: string;
    INFURA_MUMBAI: string;
    INFURA_SEPOLIA: string;
    ETHERSCAN_API_KEY: string;
    FREE_SEPOLIA: string;
  };
};

const config: HardhatUserConfig = {
  // defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: process.env.INFURA_SEPOLIA,
        blockNumber: 3138132,
      },
    },

    mumbai: {
      // url: process.env.INFURA_MUMBAI,
      url: 'https://rpc.ankr.com/polygon_mumbai',
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      // url: process.env.INFURA_SEPOLIA,
      url: process.env.FREE_SEPOLIA,
      accounts: [process.env.PRIVATE_KEY],
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
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
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
