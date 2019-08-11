let express = require("express");
let Contract = require("truffle-contract");
let Web3 = require("web3");

let abi = [
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_par",
          "type": "uint256"
        },
        {
          "name": "_parDecimals",
          "type": "uint256"
        },
        {
          "name": "_coupon",
          "type": "uint256"
        },
        {
          "name": "_term",
          "type": "uint256"
        },
        {
          "name": "_cap",
          "type": "uint256"
        },
        {
          "name": "_timesToRedeem",
          "type": "uint256"
        },
        {
          "name": "_tokenToRedeem",
          "type": "address"
        },
        {
          "name": "_loopLimit",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipRenounced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "bondsAmount",
          "type": "uint256"
        }
      ],
      "name": "MintedBond",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "caller",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "bonds",
          "type": "uint256[]"
        }
      ],
      "name": "RedeemedCoupons",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "caller",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amountClaimed",
          "type": "uint256"
        }
      ],
      "name": "ClaimedPar",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "bonds",
          "type": "uint256[]"
        }
      ],
      "name": "Transferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_loopLimit",
          "type": "uint256"
        }
      ],
      "name": "changeLoopLimit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "buyer",
          "type": "address"
        },
        {
          "name": "_bondsAmount",
          "type": "uint256"
        }
      ],
      "name": "mintBond",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_bonds",
          "type": "uint256[]"
        }
      ],
      "name": "redeemCoupons",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "receiver",
          "type": "address"
        },
        {
          "name": "_bonds",
          "type": "uint256[]"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "bond",
          "type": "uint256"
        }
      ],
      "name": "getLastTimeRedeemed",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "bond",
          "type": "uint256"
        }
      ],
      "name": "getBondOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "bond",
          "type": "uint256"
        }
      ],
      "name": "getRemainingCoupons",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "bond",
          "type": "uint256"
        }
      ],
      "name": "getCouponsRedeemed",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTokenAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTimesToRedeem",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTerm",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "bond",
          "type": "uint256"
        }
      ],
      "name": "getMaturity",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getSimpleInterest",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCouponRate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getParValue",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCap",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "who",
          "type": "address"
        }
      ],
      "name": "getBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getParDecimals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTokenToRedeem",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getName",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTotalDebt",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTotalBonds",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getNonce",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCouponThreshold",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
let provider = new Web3.providers.HttpProvider("http://localhost:22000");
let bin = "0x60806040526000600c556000600d553480156200001b57600080fd5b5060405162001f8638038062001f86833981018060405281019080805182019291906020018051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008951111515620000e457600080fd5b600086111515620000f457600080fd5b6000881115156200010457600080fd5b6000851115156200011457600080fd5b6000811115156200012457600080fd5b600183101515156200013557600080fd5b88600190805190602001906200014d92919062000213565b50876007819055508360068190555080600b819055508660048190555082600a819055508560088190555084600981905550620001a6600a54600954620001fc6401000000000262001a4c179091906401000000009004565b600d8190555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050505050505050620002c2565b600081838115156200020a57fe5b04905092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200025657805160ff191683800117855562000287565b8280016001018555821562000287579182015b828111156200028657825182559160200191906001019062000269565b5b5090506200029691906200029a565b5090565b620002bf91905b80821115620002bb576000816000905550600101620002a1565b5090565b90565b611cb480620002d26000396000f30060806040526004361061015f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630f0044bf1461016457806310fe9ae8146101a5578063112f84e1146101fc578063124b65b41461022757806317d7de7c146102525780632b4e4e96146102e257806334ce998a146103685780633af0ca191461039357806343b07485146103ea578063554d578d1461042b57806366e3d5ac1461045657806370843ae9146104a3578063715018a6146104ce5780637a36c307146104e55780637aafdeee1461054b5780637f1e7d41146105765780638da5cb5b146105b757806395be1f1a1461060e578063bb305ef21461064f578063cb57b0a5146106bc578063d087d288146106e7578063d561bf5314610712578063d87f0afc1461073d578063e0e09e0f1461076a578063e575943614610795578063f2fde38b146107c0578063f8b2cb4f14610803575b600080fd5b34801561017057600080fd5b5061018f6004803603810190808035906020019092919050505061085a565b6040518082815260200191505060405180910390f35b3480156101b157600080fd5b506101ba6108cf565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561020857600080fd5b506102116108f9565b6040518082815260200191505060405180910390f35b34801561023357600080fd5b5061023c61093f565b6040518082815260200191505060405180910390f35b34801561025e57600080fd5b50610267610949565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102a757808201518184015260208101905061028c565b50505050905090810190601f1680156102d45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156102ee57600080fd5b50610366600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091929192905050506109eb565b005b34801561037457600080fd5b5061037d610d66565b6040518082815260200191505060405180910390f35b34801561039f57600080fd5b506103a8610d70565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103f657600080fd5b5061041560048036038101908080359060200190929190505050610d9a565b6040518082815260200191505060405180910390f35b34801561043757600080fd5b50610440610e21565b6040518082815260200191505060405180910390f35b34801561046257600080fd5b506104a1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610e2b565b005b3480156104af57600080fd5b506104b86111ce565b6040518082815260200191505060405180910390f35b3480156104da57600080fd5b506104e36111d8565b005b3480156104f157600080fd5b50610549600480360381019080803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091929192905050506112da565b005b34801561055757600080fd5b506105606117e3565b6040518082815260200191505060405180910390f35b34801561058257600080fd5b506105a1600480360381019080803590602001909291905050506117ed565b6040518082815260200191505060405180910390f35b3480156105c357600080fd5b506105cc61180a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561061a57600080fd5b506106396004803603810190808035906020019092919050505061182f565b6040518082815260200191505060405180910390f35b34801561065b57600080fd5b5061067a6004803603810190808035906020019092919050505061184c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156106c857600080fd5b506106d1611889565b6040518082815260200191505060405180910390f35b3480156106f357600080fd5b506106fc611893565b6040518082815260200191505060405180910390f35b34801561071e57600080fd5b5061072761189d565b6040518082815260200191505060405180910390f35b34801561074957600080fd5b50610768600480360381019080803590602001909291905050506118a7565b005b34801561077657600080fd5b5061077f61191b565b6040518082815260200191505060405180910390f35b3480156107a157600080fd5b506107aa611925565b6040518082815260200191505060405180910390f35b3480156107cc57600080fd5b50610801600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061192f565b005b34801561080f57600080fd5b50610844600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611996565b6040518082815260200191505060405180910390f35b6000806000610887600954600f6000878152602001908152602001600020546119df90919063ffffffff16565b91506108c36108b4600d5460106000888152602001908152602001600020546119f890919063ffffffff16565b83611a3090919063ffffffff16565b90508092505050919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000806000610906611889565b915061091061189d565b9050610938606461092a84846119f890919063ffffffff16565b611a4c90919063ffffffff16565b9250505090565b6000600954905090565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109e15780601f106109b6576101008083540402835291602001916109e1565b820191906000526020600020905b8154815290600101906020018083116109c457829003601f168201915b5050505050905090565b60008082511115156109fc57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610a3857600080fd5b610a4133611996565b825111151515610a5057600080fd5b600090505b8151811015610cbb573373ffffffffffffffffffffffffffffffffffffffff16600e60008484815181101515610a8757fe5b90602001906020020151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580610b0e5750600a54601060008484815181101515610af357fe5b90602001906020020151815260200190815260200160002054145b15610b1857610cae565b82600e60008484815181101515610b2b57fe5b90602001906020020151815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610bd46001601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546119df90919063ffffffff16565b601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610c6a6001601160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611a3090919063ffffffff16565b601160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8080600101915050610a55565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f227687bda9848548d0e213bd3dcc76bc21295e33dff6849e2c2bd7c75cb77bf7846040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610d4e578082015181840152602081019050610d33565b505050509050019250505060405180910390a3505050565b6000600354905090565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000806000610da88461184c565b9150600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610e07577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9250610e1a565b610e108461182f565b905080600a540392505b5050919050565b6000600654905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e8857600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610ec457600080fd5b60018210151515610ed457600080fd5b600b548211151515610ee557600080fd5b60006006541115610f1657600654610f0883600554611a3090919063ffffffff16565b11151515610f1557600080fd5b5b610f2b82600554611a3090919063ffffffff16565b600581905550610f4682600c54611a3090919063ffffffff16565b600c81905550600090505b818110156110ce57610f6e60095442611a3090919063ffffffff16565b600f6000610f8784600c546119df90919063ffffffff16565b81526020019081526020016000208190555082600e6000610fb384600c546119df90919063ffffffff16565b815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006010600061101a84600c546119df90919063ffffffff16565b81526020019081526020016000208190555061107e82601160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611a3090919063ffffffff16565b601160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508080600101915050610f51565b6111586111216110e984600a546119f890919063ffffffff16565b61111360646111056008546007546119f890919063ffffffff16565b611a4c90919063ffffffff16565b6119f890919063ffffffff16565b61114a611139856007546119f890919063ffffffff16565b600354611a3090919063ffffffff16565b611a3090919063ffffffff16565b6003819055507ff684d4510acd3fe860087ff339d3668df1f4b82d05e5b4cab07130929bfa835d8383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1505050565b6000600d54905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561123357600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600080600080600085511115156112f057600080fd5b600b5485511115151561130257600080fd5b61130b33611996565b85511115151561131a57600080fd5b600093506000925060009150600090505b845181101561174d57600a5460106000878481518110151561134957fe5b90602001906020020151815260200190815260200160002054141561136d57611740565b6113ac600954600f6000888581518110151561138557fe5b906020019060200201518152602001908152602001600020546119df90919063ffffffff16565b93506113ff6113f0600d546010600089868151811015156113c957fe5b906020019060200201518152602001908152602001600020546119f890919063ffffffff16565b85611a3090919063ffffffff16565b9250600f6000868381518110151561141357fe5b90602001906020020151815260200190815260200160002054611441600d5485611a3090919063ffffffff16565b101580611461575061145e600d5484611a3090919063ffffffff16565b42105b1561146b57611740565b611492600d5461148485426119df90919063ffffffff16565b611a4c90919063ffffffff16565b915060008214156114a257611740565b6114df826010600088858151811015156114b857fe5b90602001906020020151815260200190815260200160002054611a3090919063ffffffff16565b6010600087848151811015156114f157fe5b906020019060200201518152602001908152602001600020819055506115b361156361155461152c6002600454611a3090919063ffffffff16565b600a0a6115466008546007546119f890919063ffffffff16565b611a4c90919063ffffffff16565b846119f890919063ffffffff16565b600e6000888581518110151561157557fe5b90602001906020020151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611a62565b600a546010600087848151811015156115c857fe5b90602001906020020151815260200190815260200160002054141561173f576000600e600087848151811015156115fb57fe5b90602001906020020151815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600f6000878481518110151561166557fe5b90602001906020020151815260200190815260200160002081905550601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600081548092919060019003919050555061173e6116ee600454600a0a600754611a4c90919063ffffffff16565b600e6000888581518110151561170057fe5b90602001906020020151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611a62565b5b5b808060010191505061132b565b3373ffffffffffffffffffffffffffffffffffffffff167f6842ed68604cbaecf495f440b5684cffd179b26f069e5205907f642a1bc91e4d866040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156117c95780820151818401526020810190506117ae565b505050509050019250505060405180910390a25050505050565b6000600554905090565b6000600f6000838152602001908152602001600020549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060106000838152602001908152602001600020549050919050565b6000600e600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600854905090565b6000600c54905090565b6000600754905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561190257600080fd5b60008111151561191157600080fd5b80600b8190555050565b6000600454905090565b6000600a54905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561198a57600080fd5b61199381611b8e565b50565b6000601160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60008282111515156119ed57fe5b818303905092915050565b600080831415611a0b5760009050611a2a565b8183029050818382811515611a1c57fe5b04141515611a2657fe5b8090505b92915050565b60008183019050828110151515611a4357fe5b80905092915050565b60008183811515611a5957fe5b04905092915050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660405180807f7472616e7366657228616464726573732c75696e742900000000000000000000815250601601905060405180910390207c0100000000000000000000000000000000000000000000000000000000900482846040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381865af49250505050611b84826003546119df90919063ffffffff16565b6003819055505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515611bca57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820767aec42528ae8599b12cec0abd98f530d1a796ffcfc646b8f98c23be06ec16b0029";

let MakeBond = Contract({
    abi: abi,
    unlinked_binary: bin
});
MakeBond.setProvider(provider);


let router = express.Router();

router.get("/makeBond", (req, res) => {
    console.log(req.query.name);
    console.log(req.query.parDecimals);
    let name = req.query.name;
    let par = req.query.par;
    let parDecimals = req.query.parDecimals;
    let coupon = req.query.coupon;
    let term = req.query.term;
    let cap = req.query.cap;
    let timesToRedeem = req.query.timesToRedeem;
    let tokenToRedeem = req.query.tokenToRedeem;

    // 새로운 컨트랙 만들어서 리스폰스 전송
    MakeBond.new(name, par, parDecimals, coupon, term, cap, timesToRedeem, tokenToRedeem, 100000000,{ from: tokenToRedeem }).then(instance => {
        res.send(JSON.stringify(instance));
    });
});

module.exports = router;