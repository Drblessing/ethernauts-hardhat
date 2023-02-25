async function main() {
  const web3 = new Web3('http://127.0.0.1:8545/');
  const balance = await web3.eth.getBalance(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  );
  console.log(`Balance: ${balance}`);
  console.log(web3.eth.Contract.transactionPollingInterval);

  var abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'string',
          name: 'id',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Deposit',
      type: 'event',
    },
    {
      inputs: [],
      name: 'currentId',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'id',
          type: 'string',
        },
      ],
      name: 'deposit',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ];
  var clientReceipt = new web3.eth.Contract(
    abi,
    '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  );

  // var depositEvent = clientReceipt.events.Deposit();

  // // watch for changes
  // depositEvent.on('data', function (error, result) {
  //   // result contains non-indexed arguments and topics
  //   // given to the `Deposit` call.
  //   if (!error) console.log(result);
  // });

  // Or pass a callback to start watching immediately
  // look at the last 5 blocks
  clientReceipt.events.Deposit(
    { fromBlock: 'latest' },
    function (error, event) {
      if (!error) console.log(event);
    }
  );
}

main().catch((error) => {
  console.log('ERROR');
  console.error(error);
  process.exitCode = 1;
});
