// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {
    struct Star {
        string name;
    }

    mapping(uint256 => Star) starsInfos;
    mapping(uint256 => uint256) starsForSale;

    function createStar(string memory _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name);
        starsInfos[_tokenId] = newStar;
        _mint(msg.sender, _tokenId);
    }

    function setStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender);
        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        uint256 starCost = starsForSale[_tokenId];
        require(starCost > 0);
        require(msg.value >= starCost);

        address oldOwner = ownerOf(_tokenId);

        // _owners[_tokenId] = msg.sender;
        _transfer(oldOwner, msg.sender, _tokenId);

        oldOwner.transfer(starCost);
        if (msg.value - starCost) {
            msg.sender.transfer(msg.value - starCost);
        }

        starsForSale[_tokenId] = 0;
        // require msg.value >= cost
        // change star owner to msg.sender
        // transfer cost to owner
        // if any, transfer change back to sender
        // remove star from upForSale list
    }
}
