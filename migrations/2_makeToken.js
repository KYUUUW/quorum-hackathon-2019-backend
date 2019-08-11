const makeToken = artifacts.require("makeToken");

module.exports = function(deployer) {

  deployer.deploy(makeToken, "KRW", "Won", 1, 9999999999);
};
