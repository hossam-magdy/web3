// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Specs:
// https://eips.ethereum.org/EIPS/eip-20

import '../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol';
contract HSampleToken is IERC20 {
// contract HSampleToken {
  string private _name = "HSample Token";
  string private _symbol = "HST";
  uint8 private _decimals = 18;
  uint256 private _totalSupply = 10000 * ( 10 ** _decimals );

  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) private _allowance;

  // event Transfer(address indexed from, address indexed to, uint256 value);
  // event Approval(address indexed owner, address indexed spender, uint256 value);

  constructor() {
    _balances[msg.sender] = _totalSupply;
  }

  function name() public view returns (string memory) {
    return _name;
  }
  
  function symbol() public view returns (string memory) {
    return _symbol;
  }
  
  function decimals() public view returns (uint8) {
    return _decimals;
  }

  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return _balances[_owner];
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(_balances[msg.sender] >= _value);
    _balances[_to] = _balances[_to] + _value;
    _balances[msg.sender] = _balances[msg.sender] - _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(_balances[_from] >= _value);
    require(_allowance[_from][msg.sender] >= _value);
    _balances[_to] = _balances[_to] + _value;
    _balances[_from] = _balances[_from] - _value;
    _allowance[_from][msg.sender] = _allowance[_from][msg.sender] - _value;
    emit Transfer(_from, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) public returns (bool success) {
    _allowance[msg.sender][_spender] = _value;
    return true;
  }

  function allowance(address _owner, address _spender) public view returns (uint256 remaining)  {
    return _allowance[_owner][_spender];
  }

}
