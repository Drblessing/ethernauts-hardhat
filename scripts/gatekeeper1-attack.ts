import { ethers } from 'hardhat';
import hre from 'hardhat';

// Deploy and verify gatekeeper and attack contract

// https://mumbai.polygonscan.com/address/0x80dD5fee1f9A7F3bBE6606642B36aD51207C1244#readContract
// Gas used for this was 256, on remix the amount was 452.
// Not sure why it was less on mumbai than ethereum.
// However, it worked when I manually deployed the same contract.
// Weird.
// https://mumbai.polygonscan.com/address/0x2ff4e032ad00bd56198b8d99067505ef6185fb63#readContract
// Gas is 423 on my own contract. What is going on?
// Maybe more solidity optimizations?
// Let me try with optimizations on.
// With optimizations, it was 253 gas.
// So the contract is optimized.
// In the future, I can brute force with some smart seeding,
// or figure out how to stack trace mumbai trasnactions for unverified contracts.
async function main() {
  // deploy gatekeeper contract
  // const gatekeeper_name = 'GatekeeperOne';
  // const gatekeeper_file = 'Gatekeeper1';
  // const gatekeeper_location = `contracts/${gatekeeper_file}.sol:${gatekeeper_name}`;

  // const Gatekeeper = await ethers.getContractFactory(gatekeeper_name);
  // const gatekeeper = await Gatekeeper.deploy({});

  // await gatekeeper.deployed();

  // console.log(
  //   `Deployed gatekeeper to address: ${gatekeeper.address} on network: ${hre.network.name}`
  // );

  // await gatekeeper.deployTransaction.wait(7);

  // // verify gatekeeper on polygonscan
  // try {
  //   await hre.run('verify:verify', {
  //     address: gatekeeper.address,
  //     contract: gatekeeper_location,
  //     constructorArguments: [],
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  // deploy gatekeeper attack contract
  const contract_name = 'GatekeeperOneAttack';
  const contract_file = 'Gatekeeper1';
  const contract_location = `contracts/${contract_file}.sol:${contract_name}`;
  const hackable_contract_address =
    '0x7001F6dEAe62DDB5eFD89185818CD39110C4d7b8';

  const Contract = await ethers.getContractFactory(contract_name);
  const contract = await Contract.deploy(hackable_contract_address, {
    gasLimit: 1_000_000,
  });

  await contract.deployed();

  console.log(
    `Deployed contract to address: ${contract.address} on network: ${hre.network.name}`
  );

  await contract.deployTransaction.wait(7);

  // verify contract on polygonscan, try in case it already is verified

  // try catch block
  try {
    await hre.run('verify:verify', {
      address: contract.address,
      contract: contract_location,
      constructorArguments: [hackable_contract_address],
    });
  } catch (error) {
    console.log(error);
  }

  const attack = await contract.attack({ gasLimit: 10_000_000 });
  await attack.wait();
  console.log('Transaction hash:', attack.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
