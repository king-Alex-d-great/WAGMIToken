// //SPDX-License-Identifier : MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// contract GmAfrica is ERC721URIStorage, Ownable {
// using Counters for Counters.Counter;
// Counters.Counter private _tokenIds;

//     constructor() ERC721("GmAfrica", "wagmi") {}

//     //mint
//     function mintNft (address reciepient, string memory tokenUri) public onlyOwner returns (uint) {
//         _tokenIds.increment();
//         uint newItemId = _tokensIds.current();
//         _safeMint(reciepient, newItemId);
//         _setTokenURI(newItemId, tokenUri);

//         return newItemId;
//     }

//     //balance
//     function checkAddressNftBalance (address owner) public view returns (uint) {
//         return balanceOf(owner);
//     }

//     //ownerof
//     function checkOwnerOfNft (uint tokenId) public view returns (address) {
//         return ownerOf(tokenId);
//     }

//     //transfer
//     function transferNft (address from, address to, uint tokenId) public {
//         _safeTransfer(from, to, tokenId);
//     }
// }