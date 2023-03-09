const { run } = require('hardhat');

const verify = async (contractAddress, args) => {
  if (network.name === 'hardhat') {
    console.log('No need to verify on hardhat!');
    return;
  }

  // Wait 20 seconds
  await new Promise((resolve) => setTimeout(resolve, 20000));
  console.log('Verifying contract...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log('Verification completed!');
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    } else {
      console.log(e);
    }
  }
};

module.exports = {
  verify,
};
