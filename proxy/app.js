let axios = require("axios");
let express = require("express");
let Web3 = require("web3");
let Contract = require("truffle-contract");

let app = express();

app.use(require("./makeToken.js"));
app.use(require("./makeBond.js"));
app.use(require("./bonds/mintBond.js"));
app.use(require("./bonds/getTotalBonds.js"));


app.listen(3000);