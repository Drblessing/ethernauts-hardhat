import { ethers } from 'hardhat';

// 0x96c6909Fafb6822a2bbd3928D779cD27D05C3B24
async function main() {
  const privacyAddress = '0x96c6909Fafb6822a2bbd3928D779cD27D05C3B24';

  // Get first 5 storage slots for privacy contract
  const first8 = await Promise.all([
    ethers.provider.getStorageAt(privacyAddress, 0),
    ethers.provider.getStorageAt(privacyAddress, 1),
    ethers.provider.getStorageAt(privacyAddress, 2),
    ethers.provider.getStorageAt(privacyAddress, 3),
    ethers.provider.getStorageAt(privacyAddress, 4),
    ethers.provider.getStorageAt(privacyAddress, 5),
    ethers.provider.getStorageAt(privacyAddress, 6),
    ethers.provider.getStorageAt(privacyAddress, 7),
    ethers.provider.getStorageAt(privacyAddress, 8),
  ]);

  console.log('First 8 storage slots:', first8);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
