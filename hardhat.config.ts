import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
// import etherscan for contract verification
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-web3';

// import ethers
// import .env variables
import dotenv from 'dotenv';
// load
dotenv.config();
// fix .env private key for typescript telling it string is defined
declare var process: {
  env: {
    PRIVATE_KEY: string;
    POLYGONSCAN_API_KEY: string;
    INFURA_MUMBAI: string;
  };
};

const config: HardhatUserConfig = {
  networks: {
    mumbai: {
      url: process.env.INFURA_MUMBAI,
      // url: 'https://rpc-mumbai.maticvigil.com',
      // url: 'https://endpoints.omniatech.io/v1/matic/mumbai/public',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  // Enable a 0.6 compiler
  // solidity: '0.8.17',
  solidity: {
    compilers: [
      {
        version: '0.8.17',
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
    ],
  },
};

export default config;
