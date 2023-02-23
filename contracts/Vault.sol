// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 0xE85d3Bed810B649C2dcB5A49Ae0a4c5b75B29B41
contract Vault {
    bool public locked;
    bytes32 private password;

    constructor(bytes32 _password) {
        locked = true;
        password = _password;
    }

    function unlock(bytes32 _password) public {
        if (password == _password) {
            locked = false;
        }
    }
}
