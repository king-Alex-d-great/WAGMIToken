//Add spdx licence
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WagmiTkn {
    string public name = "WAGMIToken";
    string public symbol = "WTKN";
    uint public totalSupply = 10000000;

    mapping (address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
    } 

    function transfer(address to, uint amount) external {
        require (balances[msg.sender] >= amount, "Yea, we all gonna make it but you have insufficient WagmiTokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf (address sender) external view returns (uint) {
        return balances[sender];
    }
}