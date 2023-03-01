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

// Hack this contract to get the flag
contract AlienAttack {

}


/*

{
	"0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563": {
		"key": "0x0000000000000000000000000000000000000000000000000000000000000000",
		"value": "0x015b38da6a701c568545dcfcb03fcb875f56beddc4"
	},
	"0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6": {
		"key": "0x0000000000000000000000000000000000000000000000000000000000000001",
		"value": "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"
	},
	"0xb5d9d894133a730aa651ef62d26b0ffa846233c74177a591a4a896adfda97d22": {
		"key": "0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6",
		"value": "0x0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4"
	}
}

{
	"0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563": {
		"key": "0x0000000000000000000000000000000000000000000000000000000000000000",
		"value": "0x015b38da6a701c568545dcfcb03fcb875f56beddc4"
	},
	"0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6": {
		"key": "0x0000000000000000000000000000000000000000000000000000000000000001",
		"value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
	}
}

{
	"0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563": {
		"key": "0x0000000000000000000000000000000000000000000000000000000000000000",
		"value": "0x015b38da6a701c568545dcfcb03fcb875f56beddc4"
	},
	"0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6": {
		"key": "0x0000000000000000000000000000000000000000000000000000000000000001",
		"value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
	},
	"0xb5d9d894133a730aa651ef62d26b0ffa846233c74177a591a4a896adfda97d22": {
		"key": "0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6",
		"value": "0xaaaaaa6a701c568545dcfcb03fcb875f56beddc4"
	}
}

*/