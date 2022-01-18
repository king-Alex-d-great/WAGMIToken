//SPDX-License-Identifier: UNLICENSED 

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract RecommendationPortal {
       
   //should have an event!!
      uint totalAboutMes;

   mapping (address => string) employeeToAboutme;
    //Am an employer, this is a contract where you send info about your self nd why i should employ u

    //I want a person to be able to send me an about me
    function sendAboutMe (string memory aboutme) public {
        totalAboutMes += 1;
        _saveAboutMe(msg.sender, aboutme);
        console.log("%s just sent you an about me %s", msg.sender, aboutme);
    }
    // i want to be able to save peoples aboutme 

    function _saveAboutMe (address sender, string memory aboutme) private {
        //require that the person has not sent stuff ever before!!
        employeeToAboutme[sender] = aboutme;
        //emit an event! 
    }

    //I want to be able to get the number of about mes i have
    function getTotalAboutMes () public view returns (uint) {
        console.log("We have %d potential employees", totalAboutMes);
        return totalAboutMes;
    }
}