// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MagicNum {
    address public solver;

    constructor() {}

    function setSolver(address _solver) public {
        solver = _solver;
    }

    /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}

pragma solidity ^0.5.5;

contract DeployBytecode {
    // Create contract from bytecode
    function deployBytecode(bytes memory bytecode) public returns (address) {
        address retval;
        assembly {
            mstore(0x0, bytecode)
            retval := create(0, 0xa0, calldatasize)
        }
        return retval;
    }
}

/*

We need to right the deployment bytecode that will return the runtime bytecode when 
evaulted by the EVM.

The runtime bytecode is the bytecode that will be executed by the EVM.
It needs to return 42, which is the magic number.
In the EVM, return values are represented as bytes32, which is a 256 bit word. 
Therefore, we need to encode 42 as a 32 byte word. 
Also, the EVM expects return values to be in hexadecimal format.
Therefore, the runtime bytecode must output:
0x000000000000000000000000000000000000000000000000000000000000002a

Here are two runtime bytecodes: 
- 0x602a60005260206000f3
- 0x602a60505260206050f3

To view them you can use evm playground on evm.codes.

I'm going to use 0x602a60005260206000f3 as the runtime bytecode, 
because it is more gas efficient. Because it uses less 
EVM memory pages. 
Note that you can offset the 42 stored in memory as much as you want, 
the first solution has 0x50 has a magic number. 

To craft the deployment bytecode, 
we know it has to return the runtime bytecode: 0x602a60005260206000f3.
To do this we simply append this bytecode with a simple bytecode script
that uses "CODECOPY" to copy the last of the deployment bytecode into 
memory, then use return to return the runtimebytecode from memory.

Deployment Bytecode:
0x600a600c600039600a6000f3602a60005260206000f3
 
So we send this bytecode to the 0 address with 0 ether, using remix, hardhat, web3, etc. 



*/
