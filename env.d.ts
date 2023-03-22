// Declare types for process.env
declare namespace NodeJS {
  interface ProcessEnv {
    PRIVATE_KEY: string;
    POLYGONSCAN_API_KEY: string;
    ETHERSCAN_API_KEY: string;
    INFURA_MUMBAI: string;
    INFURA_SEPOLIA: string;
  }
}
