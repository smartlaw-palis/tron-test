pragma solidity ^0.4.23;


contract Contract1 {
    function balance() public view returns(uint256) {
        return address(this).balance;
    }
}