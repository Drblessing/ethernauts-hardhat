import { ethers } from 'hardhat';
// import hre
import hre from 'hardhat';

async function main() {
  const Contract = await ethers.getContractFactory('CoinFlipAttack');
  const contract = await Contract.deploy(
    '0x7cf95463291af0430316df97fe16a62532a8a539'
  );

  await contract.deployed();

  console.log(
    `Deployed contract to address: ${contract.address} on network: ${hre.network.name}`
  );

  // wait 5 blocks to ensure deployment before verifying
  await contract.deployTransaction.wait(5);

  // verify contract on polygonscan
  await hre.run('verify:verify', {
    address: contract.address,
    contract: 'contracts/CoinFlip.sol:CoinFlipAttack',
    constructorArguments: ['0x7cf95463291af0430316df97fe16a62532a8a539'],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
