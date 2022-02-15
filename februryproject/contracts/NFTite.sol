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

    event NftBought(address indexed acquirer, uint indexed tokenId);
    event NftGifted(address indexed from, address indexed to, uint indexed tokenId);
    event TryingToSellPrematureNFT(address indexed sender, uint indexed tokenId, uint indexed amount);
    event MintSucces (address sender);

    //Address, tokenId, time gotten/Given away
    mapping(address => mapping(uint => uint)) private _tokenToTimeAcquired;
    mapping(address => mapping(uint => uint)) private _tokenToTimeGivenAway;

    //tokenId to amount available/minted
    mapping(uint => uint) private tokenAvailable;   
    //store six months as a private field Six months = now (182.50000182500003 * 1days ) 

    constructor () public payable ERC721("NFTite", "nftite") {}
    

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

    function _getHoldTimeAndMaturityStatus(address _holder, uint _tokenId) private view returns (bool, uint) {
       
        //get the date it was purchased
        //compare now and date
        //return a bool
       uint datePurchased = _tokenToTimeAcquired[_holder][_tokenId];
       uint holdTime = now - datePurchased;
       if (now - datePurchased > 183 days){
           return (true, holdTime) 
       }
       return (false, holdTime;
    }

    function SellNft (uint tokenId) external nonReentrant {
        require(msg.sender == _owners[tokenId], "You do not have permission to sell this NFT!");
        //check that person doing this is the owner of the NFT
        tokenAvailable[tokenId] +=  1;
        
        let (isUpToSixMonths, timeOfHold) = __getHoldTimeAndMaturityStatus();
        let cashoutAmount = _calculateCashoutAmount(timeOfhold,tokenId, addressi);
          //emit event if the person time acquired is not up to six months
        if(!isUpToSixMonths){
           emit TryingToSellPrematureNFT(msg.sender, tokenId, cashoutAmount);
        }
        _safeTransfer(msg.sender, _contractWalletAddress, tokenId);
        payable(msg.sender).transfer(cashoutAmount);
    }

    function GetAllHolders () external view {
        //Use a struct
    }   

    function _calculateCashoutAmount (uint initialInvestment) private pure returns (uint) {
        //get initial amount of token
        //get the timeOfHold
        uint amountPerday = initialInvestment / 365 days;

        //if time of Hold is greater than 6 months       	
	   uint amountToGet = amountPerday * daysHeld;

       //if timeofhold is less than 6 months
	   uint amountToGet = 30/100 * initialInvestment;
       //182.50000182500003 (6 months) half of 365 days.
    }


    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

     function withdrawMoney() external onlyOwner reentrant {
        address payable to = payable(msg.sender);
        to.transfer(getBalance());
    }

    function withdrawMoneyTo(address payable _to) external onlyOwner reentrant {
        _to.transfer(getBalance());
    }

}