const HSampleToken = artifacts.require("HSampleToken");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(HSampleToken);
  // console.log('{{{ HSampleToken }}}', { deployer, network, accounts })
};
