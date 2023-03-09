import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-web3';
import dotenv from 'dotenv';
dotenv.config();
declare var process: {
  env: {
    PRIVATE_KEY: string;
    POLYGONSCAN_API_KEY: string;
    INFURA_MUMBAI: string;
    INFURA_SEPOLIA: string;
    ETHERSCAN_API_KEY: string;
  };
};

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      mining: {
        auto: true,
      },
    },
    mumbai: {
      url: process.env.INFURA_MUMBAI,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.INFURA_SEPOLIA,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
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
        version: '0.6.12',
      },
      {
        version: '0.5.17',
      },
    ],
  },
};

export default config;
