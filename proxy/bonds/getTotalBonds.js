let express = require("express");
let Contract = require("truffle-contract");
let Web3 = require("web3");

let app = express();

let provider = new Web3.providers.HttpProvider("http://localhost:22000");
let firstAddr = "";
let router = express.Router();

let abi = [
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x715018a6"
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
        "type": "function",
        "signature": "0x8da5cb5b"
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
        "type": "function",
        "signature": "0xf2fde38b"
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
        "type": "constructor",
        "signature": "constructor"
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
        "type": "event",
        "signature": "0xf8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c64820"
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
        "type": "event",
        "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
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
        "type": "event",
        "signature": "0xf684d4510acd3fe860087ff339d3668df1f4b82d05e5b4cab07130929bfa835d"
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
        "type": "event",
        "signature": "0x6842ed68604cbaecf495f440b5684cffd179b26f069e5205907f642a1bc91e4d"
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
        "type": "event",
        "signature": "0x3c9a83be8d341a5f510954a312008a61c1b16933c3ca8572918187868449e279"
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
        "type": "event",
        "signature": "0x227687bda9848548d0e213bd3dcc76bc21295e33dff6849e2c2bd7c75cb77bf7"
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
        "type": "function",
        "signature": "0xd87f0afc"
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
        "type": "function",
        "signature": "0x66e3d5ac"
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
        "type": "function",
        "signature": "0x7a36c307"
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
        "type": "function",
        "signature": "0x2b4e4e96"
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
        "type": "function",
        "signature": "0x0f0044bf"
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
        "type": "function",
        "signature": "0xbb305ef2"
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
        "type": "function",
        "signature": "0x43b07485"
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
        "type": "function",
        "signature": "0x95be1f1a"
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
        "type": "function",
        "signature": "0x10fe9ae8"
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
        "type": "function",
        "signature": "0xe5759436"
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
        "type": "function",
        "signature": "0x124b65b4"
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
        "type": "function",
        "signature": "0x7f1e7d41"
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
        "type": "function",
        "signature": "0x112f84e1"
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
        "type": "function",
        "signature": "0xcb57b0a5"
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
        "type": "function",
        "signature": "0xd561bf53"
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
        "type": "function",
        "signature": "0x554d578d"
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
        "type": "function",
        "signature": "0xf8b2cb4f"
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
        "type": "function",
        "signature": "0xe0e09e0f"
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
        "type": "function",
        "signature": "0x3af0ca19"
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
        "type": "function",
        "signature": "0x17d7de7c"
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
        "type": "function",
        "signature": "0x34ce998a"
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
        "type": "function",
        "signature": "0x7aafdeee"
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
        "type": "function",
        "signature": "0xd087d288"
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
        "type": "function",
        "signature": "0x70843ae9"
    }
];

router.get("/getTotalBonds", (req, res) => {
    let contract = req.query.contract;
    let buyer = req.query.buyer;
    let bondsAmount = req.query.bondsAmount;
    
    let myBond = Contract({abi});
    myBond.setProvider(provider);
    console.log("aaa");
    myBond.at(contract).then((instance) => {
        console.log("bbb");
        instance.getTotalBonds({from: contract})
        .then(data => res.send(data)
        ).catch(console.log);
    })

 
});

module.exports = router;