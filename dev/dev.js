console.log('Running dev.js.');

const { deployTest } = require('../deploy/deployTest');
const { verify } = require('../utils/verify');
const { resetDex } = require('../reset/resetDex');

const main = async () => {
  const dexInstance = await resetDex();
  console.log('dexInstance:', dexInstance);
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
