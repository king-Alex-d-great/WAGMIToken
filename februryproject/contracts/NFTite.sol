//SPDX-License-Identifier : MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTite is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor () public ERC721("NFTite", "nftite") {}

    function mintNft (address recipient, string memory tokenURI) public onlyOwner returns (uint){
        
        _tokenIds.increment(); //increment tokenId
        uint newItemId = _tokenIds.current();// store currentId in a variable
        _mint(recipient, newItemId); //mint the token
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

}