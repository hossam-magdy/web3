// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StarNotary {
  string public starName;
  address public starOwner;

  event StarClaimed(address owner);

  constructor() {
    starName = "Awesome Udacity Star";
  }

  function claimStar() public {
    starOwner = msg.sender;
    emit StarClaimed(msg.sender);
  }
}
