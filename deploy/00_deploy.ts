import { ethers, network, deployments, getNamedAccounts } from 'hardhat';

const deployCoinFlip = async () => {
  const { log, deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  log('Deploying CoinFlip...');

  const deployTx = await deploy('CoinFlip', {
    from: deployer,
    args: [],
    log: true,
  });

  console.log('CoinFlip deployed to:', deployTx.address);
};

export default deployCoinFlip;
