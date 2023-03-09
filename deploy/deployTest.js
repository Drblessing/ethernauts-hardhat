const deployTest = async () => {
  const Contract = await ethers.getContractFactory('Test');
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log('Test deployed to:', contract.address);
  // Wait 6 blocks for verification
  // await contract.deployTransaction.wait(6);
  return contract;
};

module.exports = {
  deployTest,
};
