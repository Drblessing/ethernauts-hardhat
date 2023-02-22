import { ethers } from 'hardhat';
// import hre
import hre from 'hardhat';

async function main() {
  const contract_name = 'TelephoneAttack';
  const contract_location = 'contracts/Telephone.sol:TelephoneAttack';
  const hackable_contract_address =
    '0xfbb49e720c6d6900Cf326EbF4b10bfb469fb2494';

  const Contract = await ethers.getContractFactory(contract_name);
  const contract = await Contract.deploy(hackable_contract_address);

  await contract.deployed();

  console.log(
    `Deployed contract to address: ${contract.address} on network: ${hre.network.name}`
  );

  // wait 5 blocks to ensure deployment before verifying
  await contract.deployTransaction.wait(5);

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
