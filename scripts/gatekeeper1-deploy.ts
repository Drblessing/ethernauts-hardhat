import { ethers } from 'hardhat';
import hre from 'hardhat';

async function main() {
  const contract_name = 'GatekeeperOneAttack';
  const contract_file = 'Gatekeeper1';
  const contract_location = `contracts/${contract_file}.sol:${contract_name}`;
  const hackable_contract_address =
    '0x0572B9C02192173F019F84D3f42904ed56235eAa';

  const Contract = await ethers.getContractFactory(contract_name);
  const contract = await Contract.deploy(hackable_contract_address, {
    value: 0,
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
