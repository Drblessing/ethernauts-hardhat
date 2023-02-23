import { ethers } from 'hardhat';
// import hre
import hre from 'hardhat';

async function main() {
  const contract_name = 'ElevatorAttackTest';
  const contract_location = 'contracts/ElevatorTest.sol:ElevatorAttackTest';
  const hackable_contract_address =
    '0x33Db77a8B3921C4B0D4AD7e3064c75935e636d5a';

  const Contract = await ethers.getContractFactory(contract_name);
  const contract = await Contract.deploy(hackable_contract_address);

  await contract.deployed();

  console.log(
    `Deployed contract to address: ${contract.address} on network: ${hre.network.name}`
  );

  // wait 5 blocks to ensure deployment before verifying
  await contract.deployTransaction.wait(7);

  // verify contract on polygonscan
  await hre.run('verify:verify', {
    address: contract.address,
    constructorArguments: [hackable_contract_address],
    contract: contract_location,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
