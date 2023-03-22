import { expect } from 'chai';
import { Contract, Signer } from 'ethers';
import { ethers } from 'hardhat';

before(async () => {});

it('solves the challenge', async function () {
  const infos = await Promise.all([
    challenge.info(),
    challenge.info1(),
    challenge.info2(`hello`),
    challenge.infoNum(),
    challenge.info42(),
    challenge.theMethodName(),
    challenge.method7123949(),
  ]);
  console.log(infos.join(`\n`));

  const password = await challenge.password();
  console.log(`password = ${password}`);
  // can we somehow get it from constructor arguments? seems to accept a _password
  // const deploymentTx = await eoa.provider!.getTransaction(`0x047c8f63435250a79ede096557b94de95a4c5f282f0c041951b42a2d70bcd149`)
  // console.log(`Tx data:`, deploymentTx.data, Buffer.from(deploymentTx.data, `hex`).toString(`utf8`))

  tx = await challenge.authenticate(password);
  await tx.wait();
});

// after(async () => {
//   expect(await submitLevel(challenge.address), 'level not solved').to.be.true;
// });
