import { ethers, web3 } from 'hardhat';
// Attack vault by connecting to it
// already deployed on the blockchain,
// and looking through its storage
// to find the password.
async function main() {
  const vaultAddress = '0xE85d3Bed810B649C2dcB5A49Ae0a4c5b75B29B41';
  const vault = await ethers.getContractAt('Vault', vaultAddress);
  console.log('Vault contract:', vault.address);

  // Test ethers, get transaction count for my wallet.
  const txCount = await ethers.provider.getTransactionCount(
    '0x935CC8Efc9E96C5538f7a376342BA633022079A5'
  );
  console.log('Transaction count:', txCount);

  // Test web3, get transaction count for my wallet.
  const txCount2 = await web3.eth.getTransactionCount(
    '0x935CC8Efc9E96C5538f7a376342BA633022079A5'
  );
  console.log('Transaction count:', txCount2);

  // Get storage slot for password from Vault
  const password = await ethers.provider.getStorageAt(vaultAddress, 1);
  console.log('Raw password', password);
  // Pwned!
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
