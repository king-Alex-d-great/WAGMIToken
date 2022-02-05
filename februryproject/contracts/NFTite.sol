//SPDX-License-Identifier : MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTite is ERC721URIStorage, Ownable {
    using Counter for Counters.Counter;
    Counters.Counter private _tokenIds;
}