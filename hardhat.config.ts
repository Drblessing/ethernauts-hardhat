import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
// import etherscan for contract verification
import '@nomiclabs/hardhat-etherscan';
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
  };
};

const config: HardhatUserConfig = {
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  solidity: '0.8.17',
};

export default config;
