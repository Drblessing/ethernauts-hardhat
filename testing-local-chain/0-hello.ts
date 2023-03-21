import { ethers } from 'hardhat';

async function main() {
  console.log(`Provider URL: ${ethers.provider.connection.url}`);
  // Get the current block number on the local fork
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log(`Current block number: ${blockNumber}`);

  // Get the balance of a test account on the local fork
  const testAccountAddress = '0x8b6db0c11d46c118B0137667637f228ab91EA25C';
  const testAccountBalance = await ethers.provider.getBalance(
    testAccountAddress
  );
  console.log(`Test account balance: ${testAccountBalance}`);

  // Verify that the test account has a non-zero balance
  if (testAccountBalance.eq(0)) {
    console.error(`Test account has zero balance`);
    process.exit(1);
  }

  // Verify that the local fork is synchronized with the testnet
  const testnetBlockNumber = 1; // Replace with the current block number on the testnet
  if (blockNumber < testnetBlockNumber) {
    console.warn(
      `Local fork is behind testnet: local=${blockNumber} testnet=${testnetBlockNumber}`
    );
  } else {
    console.log(
      `Local fork is synchronized with testnet: local=${blockNumber} testnet=${testnetBlockNumber}`
    );
  }

  // Add any additional sanity checks here
  // Test how long it takes to deploy a contract
  const Contract = await ethers.getContractFactory('PriceConsumerV3');
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log(`Contract deployed to: ${contract.address}`);

  // Test how long it takes to call a contract
  const price = await contract.getLatestPrice();
  // Convert into dollars
  const priceInDollars = price / 1e8;
  console.log(`Price: ${priceInDollars}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
