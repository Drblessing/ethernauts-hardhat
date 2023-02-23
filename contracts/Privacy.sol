// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 0x96c6909Fafb6822a2bbd3928D779cD27D05C3B24
contract Privacy {
    bool public locked = true;
    uint256 public ID = block.timestamp;
    uint8 private flattening = 10;
    uint8 private denomination = 255;
    uint16 private awkwardness = uint16(block.timestamp);
    bytes32[3] private data;

    constructor(bytes32[3] memory _data) {
        data = _data;
    }

    function unlock(bytes16 _key) public {
        require(_key == bytes16(data[2]));
        locked = false;
    }

    /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}

/*
Notes:

The last 3 bytes of the data array are the key to unlock the contract.
The key is stored in the 3rd element of the data array.
The key is a bytes16, which is 16 bytes long.
The key is the last 16 bytes of the 3rd element of the data array.
The contract has no verified source code on Polygonscan. 
To get the data array, we either need to get into the contract's storage
or we need to get the constructor arguments.
I think the constructor arguments are the last runtime bytecodes of the contract.
From polygonscan, the last bytes32[3] of the runtime bytecode is:
0080fd5b81356fffffffffffffffffffffffffffffffff198116811460e957600080fd5b939250505056fea2646970
667358221220199fe33db58ed15b2bbeab277974ecd5658987f1e54e16ba5130d3be0834910e64736f6c634300080c0033.
The last 16 bytes of this is be0834910e64736f6c634300080c0033, which I think is the key.

It was not the key. 
The runtime bytecode, which is shown on etherscan (polygonscan) does not contain the constructor arguments.
I have to view the deployment bytecode to get the constructor arguments.
The deployment bytecode is in the creation transaction.
This is hard to find since it was created by a factory. 
In the meantime, let's try reading the contracts storage.
From vault-attack.ts:
First 8 storage slots: [
  '0x0000000000000000000000000000000000000000000000000000000000000001',
  '0x0000000000000000000000000000000000000000000000000000000063f7b56e',
  '0x00000000000000000000000000000000000000000000000000000000b56eff0a',
  '0xad7729aee1dc385ab9469344f67667472c3bad55827cfc7363883ee58e704993',
  '0xf5562f38023445e3a9b9b6b48f03fdd809efbb721615315a8582f1ba9133d777',
  '0xacd57c02e344d420420e7339a44c60e9a907a89cc3792e6db4f298cfb6a0c9e3',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x0000000000000000000000000000000000000000000000000000000000000000'
]
The first slot is the locked variable.
The second slot is the block timestamp.
The third slot is the flattening, denomination, and awkwardness variables.
They are packed together.
uint8 + uint8 + uint16 = 32 bits.
32 bits = 4 bytes.
4 bytes = 8 hex characters.
The third, fourth, and fifth slots are the data array.
The key is the last 16 bytes of the 3rd element of the data array.
The key is the first 16 bytes of the 5th slot, acd57c02e344d420420e7339a44c60e9.



*/
