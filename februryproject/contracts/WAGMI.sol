//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Wagmi is ERC20 {
    constructor() ERC20("Wagmi", "WAGMI") {
        _mint(msg.sender, 10000000 *(10 ** 18));
    }
}