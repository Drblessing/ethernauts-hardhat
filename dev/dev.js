console.log('Running dev.js.');

const { deployTest } = require('../deploy/deployTest');
const { verify } = require('../utils/verify');

const main = async () => {
  contract = await deployTest();
  await verify(contract.address, []);
};

main()
  .then(() => {
    console.log('Dev run successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
