import { ethers } from 'hardhat';
// import hre
import hre from 'hardhat';

async function main() {
  const contract_name = 'ReentranceAttack';
  const contract_location = 'contracts/Reentrancy.sol:ReentranceAttack';
  const hackable_contract_address =
    '0xA4bB9DA8DbE8913887923d0ad7ea0Ac5e63cA200';

  const Contract = await ethers.getContractFactory(contract_name);
  // deploy with 0.0011 ether
  const contract = await Contract.deploy(hackable_contract_address, {
    value: 2500000000000000,
    gasLimit: 1_000_000,
  });

  await contract.deployed();

  console.log(
    `Deployed contract to address: ${contract.address} on network: ${hre.network.name}`
  );

  // wait 5 blocks to ensure deployment before verifying
  await contract.deployTransaction.wait(7);

  // verify contract on polygonscan
  await hre.run('verify:verify', {
    address: contract.address,
    contract: contract_location,
    constructorArguments: [hackable_contract_address],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
