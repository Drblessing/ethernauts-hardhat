const {
  puzzleWallet: puzzleWalletAddress,
} = require('../instanceAddresses.json');

const {
  abi: puzzleWalletAbi,
} = require('../artifacts/contracts/PuzzleWallet.sol/PuzzleProxy.json');

const puzzleWallet = async () => {
  // Connect to puzzle proxy
  const puzzleProxy = await ethers.getContractAt(
    puzzleWalletAbi,
    puzzleWalletAddress
  );

  // Look through first 10 storage slots and print them
  //   for (let i = 0; i < 10; i++) {
  //     const slot = await puzzleProxy.provider.getStorageAt(
  //       puzzleProxy.address,
  //       i
  //     );
  //     console.log(`Slot ${i}: ${slot}`);
  //   }

  // Get storage slot at implementation slot defined in EIP1967
  // 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc
  let implementationSlot = await puzzleProxy.provider.getStorageAt(
    puzzleProxy.address,
    '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'
  );
  // Get last 20 bytes of implementation slot
  implementationSlot = implementationSlot.slice(-40);
  console.log(`Implementation slot: ${implementationSlot}`);

  // We've got the PuzzleWallet implementation address
  // Now, let's look through it.
};

puzzleWallet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
