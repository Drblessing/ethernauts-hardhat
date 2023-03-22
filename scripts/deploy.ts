import { ethers } from 'hardhat';
// import hre
import hre from 'hardhat';

async function main() {
  const contract_name = 'Lock';
  // Get first capitalized word of contract_name
  const contract_file = contract_name.match(/^[A-Z][a-z]+/)![0];
  const contract_location = `contracts/${contract_file}.sol:${contract_name}`;
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const hackable_contract_address = currentTimestampInSeconds + 1000000;

  const Contract = await ethers.getContractFactory(contract_name);
  const contract = await Contract.deploy(hackable_contract_address, {
    value: 1,
  });

  await contract.deployed();

  console.log(
    `Deployed contract to address: ${contract.address} on network: ${hre.network.name}`
  );

  // wait 5 blocks to ensure deployment before verifying
  // await contract.deployTransaction.wait(7);

  // verify contract on polygonscan
  // await hre.run('verify:verify', {
  //   address: contract.address,
  //   contract: contract_location,
  //   constructorArguments: [hackable_contract_address],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
