// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    address public manager;
    address[] private players;

    constructor(){
        manager = msg.sender;
    }
    modifier onlyManager(){
        require(isManager() , "You are not a Manager");
        _;
    }
    
    function isManager() private view returns(bool){
        return msg.sender == manager;
    }

    function enter() public payable{
        require(msg.value == 1 ether, "Require 1 ether to Enter Lottery");
        require(!isManager(), "Manager cannot join Enter Lottery");
        players.push(msg.sender);
    }

    function random() private onlyManager view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public onlyManager {
        uint indexWinner = random() % players.length;
        payable(players[indexWinner]).transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view returns(address[] memory){
        return players;
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }
}