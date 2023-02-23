import { ethers } from 'hardhat';
// import hre
import hre from 'hardhat';

async function main() {
  const contractAddress = '0x0251A386074f32F9C6b850F980164C237E85F7ab';
  const contract = await hre.ethers.getContractAt(
    'ReentranceAttack',
    contractAddress
  );

  const attack = await contract.attack({ gasLimit: 1_000_000 });
  await attack.wait();
  // Can prevent with pull payment. 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
