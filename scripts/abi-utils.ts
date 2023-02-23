import { ethers } from 'hardhat';

// Define the function signature as a string
const signature = 'pwn()';

// Encode the signature into the method ID
const methodId = ethers.utils.id(signature);

console.log('Method ID: ', methodId.substring(2, 10));
