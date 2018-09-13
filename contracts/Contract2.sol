pragma solidity ^0.4.23;
import "./Contract1.sol";

contract Contract2 {
    
    Contract1 public cont1;

    constructor(Contract1 _cont1) public {
        cont1 = _cont1;
    }

    function deposit() public payable {
        address(cont1).transfer(msg.value);
    }

    function deposit2() public payable {
    }

    function balance() public view returns(uint256) {
        return address(this).balance;
    }

}