//SPDX-License-Identifier = MIT

pragma solidity ^0.8.0;

import "@openzeppelincontracts\tokenERC721ERC721";
import "@openzeppelincontracts\tokenERC721extensionsERC721URIStorage.sol";
import "@openzeppelincontractsaccessOwnable.sol";
import "@openzeppelincontracts\utilsCounters.sol";

contract GmAfrica is ERC721URIStorage, Ownable {
using Counters for Counters.Counter;
Counters.Counter private _tokenIds;

    constructor() ERC721("GmAfrica", "wagmi") {};

    //mint
    function mintNft (address reciepient, string memory tokenUri) public onlyOwner returns (uint) {
        _tokenIds.increment();
        uint newItemid = _tokensId.current();
        _safeMint(reciepient, newItemId);
        _setTokenURI(newItemId, tokenUri);

        return newItemId;
    }

    //balance
    function checkAddressNftBalance (address owner) public view reurns (uint) {
        return balanceOf(owner);
    }

    //ownerof
    function checkOwnerOfNft (uint tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    //transfer
    function transferNft (address from, address to, tokenId){
        _safeTransfer(from, to, tokenId);
    }
}