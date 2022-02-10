//SPDX-License-Identifier : MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTite is ERC721URIStorage, ERC721Enumerable, Ownable, ReentrancyGuard {

//Using
//events
//Private
//Mappings
//constructor
//functions

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; 

    address payable private _contractWalletAddress;  

    event NftBought(address acquirer, uint tokenId);
    event NftGifted(address from, address to, uint tokenId);

    //Address, tokenId, time gotten/Given away
    mapping(address => mapping(uint => uint)) private _tokenToTimeAcquired;
    mapping(address => mapping(uint => uint)) private _tokenToTimeGivenAway;

    //tokenId to amount available/minted
    mapping(uint => uint) private tokenAvailable;    

    constructor () public ERC721("NFTite", "nftite") {}
    event MintSucces ( address sender);

    function mintNft (address recipient, string memory tokenURI) public onlyOwner returns (uint){        
        _tokenIds.increment(); //increment tokenId
        uint newItemId = _tokenIds.current();// store currentId in a variable
        _safeMint(recipient, newItemId); //mint the token
        _setTokenURI(newItemId, tokenURI);
        emit MintSucces(recipient);
        return newItemId;
    }

    function buyNft (address from, address to, uint tokenId, uint amount) external payable {
        require (msg.value == amount, "You must send money equal to gas fee");
        _contractWalletAddress.transfer(msg.value);
        _safeTransfer(from, to, tokenId);
        emit NftBought(msg.sender)
    }

    function GiftNft (address from, address to, uint tokenId) public {
        //require that sender owns the nft
        require (msg.sender = _owners[tokenId], "You are not the owner of this");
         _safeTransfer(from, to, tokenId);
         emit NftGifted(from, to, tokenId);
    }

    function SellNft (uint tokenId) external nonReentrant {

    }

}