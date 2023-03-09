const deployTest = async () => {
  const Contract = await ethers.getContractFactory('Test');
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log('Test deployed to:', contract.address);
  return contract;
};

module.exports = {
  deployTest,
};
