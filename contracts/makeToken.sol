pragma solidity 0.4.24;

 
// ----------------------------------------------------------------------------------------------
// Sample fixed supply token contract
// Enjoy. (c) BokkyPooBah 2017. The MIT Licence.
// ----------------------------------------------------------------------------------------------
 
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/issues/20
contract ERC20Interface {
    // Get the total token supply
    function totalSupply() constant returns (uint256 totalSupply);
 
    // Get the account balance of another account with address _owner
    function balanceOf(address _owner) constant returns (uint256 balance);
 
    // Send _value amount of tokens to address _to
    function transfer(address _to, uint256 _value) returns (bool success);
 
    // Send _value amount of tokens from address _from to address _to
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
 
    // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
    // If this function is called again it overwrites the current allowance with _value.
    // this function is required for some DEX functionality
    function approve(address _spender, uint256 _value) returns (bool success);
 
    // Returns the amount which _spender is still allowed to withdraw from _owner
    function allowance(address _owner, address _spender) constant returns (uint256 remaining);
 
    // Triggered when tokens are transferred.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
 
    // Triggered whenever approve(address _spender, uint256 _value) is called.
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
 
contract makeToken is ERC20Interface {
    string public symbol;
    string public name;
    uint8 public decimals;
    uint256 _totalSupply;
    
    // Owner of this contract
    address public owner;
 
    // Balances for each account
    mapping(address => uint256) balances;
 
    // Owner of account approves the transfer of an amount to another account
    mapping(address => mapping (address => uint256)) allowed;
 
    // Functions with this modifier can only be executed by the owner
    modifier onlyOwner() {
        if (msg.sender != owner) {
            throw;
        }
        _;
    }
 
    // Constructor
    function makeToken(string _symbol,string _name,uint8 _decimals,uint256 _initialSupply) {
        symbol=_symbol;
        name=_name;
        decimals=_decimals;
        owner = msg.sender;
        _totalSupply=_initialSupply;
        balances[owner] = _totalSupply;
    }
 
    function totalSupply() constant returns (uint256 totalSupply) {
        totalSupply = _totalSupply;
    }
 
    // What is the balance of a particular account?
    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }
 
    // Transfer the balance from owner's account to another account
    function transfer(address _to, uint256 _amount) returns (bool success) {
        if (balances[msg.sender] >= _amount 
            && _amount > 0
            && balances[_to] + _amount > balances[_to]) {
            balances[msg.sender] -= _amount;
            balances[_to] += _amount;
            Transfer(msg.sender, _to, _amount);
            return true;
        } else {
            return false;
        }
    }
 
    // Send _value amount of tokens from address _from to address _to
    // The transferFrom method is used for a withdraw workflow, allowing contracts to send
    // tokens on your behalf, for example to "deposit" to a contract address and/or to charge
    // fees in sub-currencies; the command should fail unless the _from account has
    // deliberately authorized the sender of the message via some mechanism; we propose
    // these standardized APIs for approval:
    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) returns (bool success) {
        if (balances[_from] >= _amount
            && allowed[_from][msg.sender] >= _amount
            && _amount > 0
            && balances[_to] + _amount > balances[_to]) {
            balances[_from] -= _amount;
            allowed[_from][msg.sender] -= _amount;
            balances[_to] += _amount;
            Transfer(_from, _to, _amount);
            return true;
        } else {
            return false;
        }
    }
 
    // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
    // If this function is called again it overwrites the current allowance with _value.
    function approve(address _spender, uint256 _amount) returns (bool success) {
        allowed[msg.sender][_spender] = _amount;
        Approval(msg.sender, _spender, _amount);
        return true;
    }
 
    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
contract ISimpleBond {

  event MintedBond(address buyer, uint256 bondsAmount);

  event RedeemedCoupons(address indexed caller, uint256[] bonds);

  event ClaimedPar(address indexed caller, uint256 amountClaimed);

  event Transferred(address indexed from, address indexed to, uint256[] bonds);


  function changeLoopLimit(uint256 _loopLimit) public;

  function mintBond(address buyer, uint256 bondsAmount) public;

  function redeemCoupons(uint256[] _bonds) public;

  function transfer(address receiver, uint256[] bonds) public;



  //PRIVATE

  function giveMoney(uint256 amount, address receiver) private;

  //GETTERS

  function getBondOwner(uint256 bond) public view returns (address);

  function getRemainingCoupons(uint256 bond) public view returns (int256);

  function getLastTimeRedeemed(uint256 bond) public view returns (uint256);

  function getSimpleInterest() public view returns (uint256);

  function getCouponsRedeemed(uint256 bond) public view returns (uint256);

  function getTokenAddress() public view returns (address);

  function getTimesToRedeem() public view returns (uint256);

  function getTerm() public view returns (uint256);

  function getMaturity(uint256 bond) public view returns (uint256);

  function getCouponRate() public view returns (uint256);

  function getParValue() public view returns (uint256);

  function getCap() public view returns (uint256);

  function getBalance(address who) public view returns (uint256);

  function getParDecimals() public view returns (uint256);

  function getTokenToRedeem() public view returns (address);

  function getName() public view returns (string);

  function getTotalDebt() public view returns (uint256);

  function getTotalBonds() public view returns (uint256);

  function getNonce() public view returns (uint256);

  function getCouponThreshold() public view returns (uint256);

}


contract Ownable {
  address public owner;


  event OwnershipRenounced(address indexed previousOwner);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) public onlyOwner {
    _transferOwnership(_newOwner);
  }

  /**
   * @dev Transfers control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function _transferOwnership(address _newOwner) internal {
    require(_newOwner != address(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
  }
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 _a, uint256 _b) internal pure returns (uint256 c) {
    // Gas optimization: this is cheaper than asserting 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (_a == 0) {
      return 0;
    }

    c = _a * _b;
    assert(c / _a == _b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 _a, uint256 _b) internal pure returns (uint256) {
    // assert(_b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = _a / _b;
    // assert(_a == _b * c + _a % _b); // There is no case in which this doesn't hold
    return _a / _b;
  }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
    assert(_b <= _a);
    return _a - _b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 _a, uint256 _b) internal pure returns (uint256 c) {
    c = _a + _b;
    assert(c >= _a);
    return c;
  }
}

contract SimpleBond is ISimpleBond, Ownable {

   using SafeMath for uint256;

   string name;

   address tokenToRedeem;

   uint256 totalDebt;

   uint256 parDecimals;

   uint256 bondsNumber;

   uint256 cap;

   uint256 parValue;

   uint256 couponRate;

   uint256 term;

   uint256 timesToRedeem;

   uint256 loopLimit;

   uint256 nonce = 0;

   uint256 couponThreshold = 0;


   mapping(uint256 => address) bonds;
   mapping(uint256 => uint256) maturities;
   mapping(uint256 => uint256) couponsRedeemed;
   mapping(address => uint256) bondsAmount;

   constructor(string _name, uint256 _par, uint256 _parDecimals, uint256 _coupon,
               uint256 _term, uint256 _cap, uint256 _timesToRedeem, address _tokenToRedeem,
               uint256 _loopLimit) {

     require(bytes(_name).length > 0);
     require(_coupon > 0);
     require(_par > 0);
     require(_term > 0);
     require(_loopLimit > 0);
     require(_timesToRedeem >= 1);

     name = _name;

     parValue = _par;

     cap = _cap;

     loopLimit = _loopLimit;

     parDecimals = _parDecimals;

     timesToRedeem = _timesToRedeem;

     couponRate = _coupon;

     term = _term;

     couponThreshold = term.div(timesToRedeem);

    tokenToRedeem=_tokenToRedeem;

   }

   /**
   * @notice Change the number of elements you can loop through in this contract
   * @param _loopLimit The new loop limit
   */

   function changeLoopLimit(uint256 _loopLimit) public onlyOwner {

     require(_loopLimit > 0);

     loopLimit = _loopLimit;

   }

   /**
   * @notice Mint bonds to a new buyer
   * @param buyer The buyer of the bonds
   * @param _bondsAmount How many bonds to mint
   */

   function mintBond(address buyer, uint256 _bondsAmount) public onlyOwner {

     require(buyer != address(0));
     require(_bondsAmount >= 1);
     require(_bondsAmount <= loopLimit);

     if (cap > 0)
       require(bondsNumber.add(_bondsAmount) <= cap);

     bondsNumber = bondsNumber.add(_bondsAmount);

     nonce = nonce.add(_bondsAmount);

     for (uint256 i = 0; i < _bondsAmount; i++) {

       maturities[nonce.sub(i)] = now.add(term);
       bonds[nonce.sub(i)] = buyer;
       couponsRedeemed[nonce.sub(i)] = 0;
       bondsAmount[buyer] = bondsAmount[buyer].add(_bondsAmount);

     }

     totalDebt = totalDebt.add(parValue.mul(_bondsAmount))
                 .add((parValue.mul(couponRate)
                 .div(100)).mul(timesToRedeem.mul(_bondsAmount)));

     emit MintedBond(buyer, _bondsAmount);

   }

   /**
   * @notice Redeem coupons on your bonds
   * @param _bonds An array of bond ids corresponding to the bonds you want to redeem apon
   */

   function redeemCoupons(uint256[] _bonds) public {

     require(_bonds.length > 0);
     require(_bonds.length <= loopLimit);
     require(_bonds.length <= getBalance(msg.sender));

     uint256 issueDate = 0;
     uint256 lastThresholdRedeemed = 0;
     uint256 toRedeem = 0;

     for (uint256 i = 0; i < _bonds.length; i++) {

       if (couponsRedeemed[_bonds[i]] == timesToRedeem) continue;
           
       issueDate = maturities[_bonds[i]].sub(term);

       lastThresholdRedeemed = issueDate.add(couponsRedeemed[_bonds[i]].mul(couponThreshold));

       if (lastThresholdRedeemed.add(couponThreshold) >= maturities[_bonds[i]] ||
           now < lastThresholdRedeemed.add(couponThreshold)) continue;

       toRedeem = (now.sub(lastThresholdRedeemed)).div(couponThreshold);

       if (toRedeem == 0) continue;

       couponsRedeemed[_bonds[i]] = couponsRedeemed[_bonds[i]].add(toRedeem);

       giveMoney( toRedeem.mul(parValue.mul(couponRate).div( 10 ** (parDecimals.add(2)) ) ), bonds[_bonds[i]] );

       if (couponsRedeemed[_bonds[i]] == timesToRedeem) {

         bonds[_bonds[i]] = address(0);
         maturities[_bonds[i]] = 0;
         bondsAmount[msg.sender]--;

         giveMoney(parValue.div( (10 ** parDecimals) ), bonds[_bonds[i]] );

       }

     }

     emit RedeemedCoupons(msg.sender, _bonds);

   }

   /**
   * @notice Transfer bonds to another address
   * @param receiver The receiver of the bonds
   * @param _bonds The ids of the bonds that you want to transfer
   */

   function transfer(address receiver, uint256[] _bonds) public {

     require(_bonds.length > 0);
     require(receiver != address(0));
     require(_bonds.length <= getBalance(msg.sender));

     for (uint256 i = 0; i < _bonds.length; i++) {

       if (bonds[_bonds[i]] != msg.sender
           || couponsRedeemed[_bonds[i]] == timesToRedeem) continue;

       bonds[_bonds[i]] = receiver;
       bondsAmount[msg.sender] = bondsAmount[msg.sender].sub(1);
       bondsAmount[receiver] = bondsAmount[receiver].add(1);

     }

     emit Transferred(msg.sender, receiver, _bonds);

   }

   /**
   * @notice Donate money to this contract
   */


   //PRIVATE

   /**
   * @notice Transfer coupon money to an address
   * @param amount The amount of money to be transferred
   * @param receiver The address which will receive the money
   */

   function giveMoney(uint256 amount, address receiver) private {

     tokenToRedeem.delegatecall(bytes4(keccak256("transfer(address,uint)")), receiver,amount);

     totalDebt = totalDebt.sub(amount);

   }

   //GETTERS

   /**
   * @dev Get the last time coupons for a particular bond were redeemed
   * @param bond The bond id to analyze
   */

   function getLastTimeRedeemed(uint256 bond) public view returns (uint256) {

     uint256 issueDate = maturities[bond].sub(term);

     uint256 lastThresholdRedeemed = issueDate.add(couponsRedeemed[bond].mul(couponThreshold));

     return lastThresholdRedeemed;

   }

   /**
   * @dev Get the owner of a specific bond
   * @param bond The bond id to analyze
   */

   function getBondOwner(uint256 bond) public view returns (address) {

     return bonds[bond];

   }

   /**
   * @dev Get how many coupons remain to be redeemed for a specific bond
   * @param bond The bond id to analyze
   */

   function getRemainingCoupons(uint256 bond) public view returns (int256) {

     address owner = getBondOwner(bond);

     if (owner == address(0)) return -1;

     uint256 redeemed = getCouponsRedeemed(bond);

     return int256(timesToRedeem - redeemed);

   }

   /**
   * @dev Get how many coupons were redeemed for a specific bond
   * @param bond The bond id to analyze
   */

   function getCouponsRedeemed(uint256 bond) public view returns (uint256) {

     return couponsRedeemed[bond];

   }

   /**
   * @dev Get the address of the token that is redeemed for coupons
   */

   function getTokenAddress() public view returns (address) {

     return (tokenToRedeem);

   }

   /**
   * @dev Get how many times coupons can be redeemed for bonds
   */

   function getTimesToRedeem() public view returns (uint256) {

     return timesToRedeem;

   }

   /**
   * @dev Get how much time it takes for a bond to mature
   */

   function getTerm() public view returns (uint256) {

     return term;

   }

   /**
   * @dev Get the maturity date for a specific bond
   * @param bond The bond id to analyze
   */

   function getMaturity(uint256 bond) public view returns (uint256) {

     return maturities[bond];

   }

   /**
   * @dev Get how much money is redeemed on a coupon
   */

   function getSimpleInterest() public view returns (uint256) {

     uint256 rate = getCouponRate();

     uint256 par = getParValue();

     return par.mul(rate).div(100);

   }

   /**
   * @dev Get the yield of a bond
   */

   function getCouponRate() public view returns (uint256) {

     return couponRate;

   }

   /**
   * @dev Get the par value for these bonds
   */

   function getParValue() public view returns (uint256) {

     return parValue;

   }

   /**
   * @dev Get the cap amount for these bonds
   */

   function getCap() public view returns (uint256) {

     return cap;

   }

   /**
   * @dev Get amount of bonds that an address has
   * @param who The address to analyze
   */

   function getBalance(address who) public view returns (uint256) {

     return bondsAmount[who];

   }

   /**
   * @dev If the par value is a real number, it might have decimals. Get the amount of decimals the par value has
   */

   function getParDecimals() public view returns (uint256) {

     return parDecimals;

   }

   /**
   * @dev Get the address of the token redeemed for coupons
   */

   function getTokenToRedeem() public view returns (address) {

     return tokenToRedeem;

   }

   /**
   * @dev Get the name of this smart bond contract
   */

   function getName() public view returns (string) {

     return name;

   }

   /**
   * @dev Get the current unpaid debt
   */

   function getTotalDebt() public view returns (uint256) {

     return totalDebt;

   }

   /**
   * @dev Get the total amount of bonds issued
   */

   function getTotalBonds() public view returns (uint256) {

     return bondsNumber;

   }

   /**
   * @dev Get the latest nonce
   */

   function getNonce() public view returns (uint256) {

     return nonce;

   }

   /**
   * @dev Get the amount of time that needs to pass between the dates when you can redeem coupons
   */

   function getCouponThreshold() public view returns (uint256) {

     return couponThreshold;

   }

}