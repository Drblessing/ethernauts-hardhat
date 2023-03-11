const {
  ethernauts: {
    mumbai: { ethernaut, dexTwo },
  },
} = require('../constants/constants.json');

const resetDexTwo = async () => {
  console.log('Resetting dex two...');
  // Create interface for Ethernauts
  const iface = new ethers.utils.Interface([
    'function createLevelInstance(address _level)',
    'event LevelInstanceCreatedLog(address indexed player,address indexed instance,address indexed level)',
    'event LevelCompletedLog(address indexed player,address indexed instance,address indexed level)',
  ]);
  // Get ethernauts contract
  const ethernauts = await ethers.getContractAt(iface, ethernaut);
  // Submit transaction to reset dex
  const tx = await ethernauts.createLevelInstance(dexTwo);
  // Wait for transaction to be mined
  await tx.wait();
  // Get create level instance event
  // Get first signer address
  const [signer] = await ethers.getSigners();
  // Get filter for create level instance event
  const filter = ethernauts.filters.LevelInstanceCreatedLog(
    ethers.utils.getAddress(signer.address),
    null,
    ethers.utils.getAddress(dexTwo)
  );
  // Query last 10 blocks for create level instance event
  const events = await ethernauts.queryFilter(filter, -10);
  // Sort events desc by blockNumber
  events.sort((a, b) => b.blockNumber - a.blockNumber);
  // Store first event
  const event = events[0];
  // Get dex contract
  const dexInstanceTwo = event.args.instance;

  return dexInstanceTwo;
};

module.exports = {
  resetDexTwo,
};
