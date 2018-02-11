var Raven = artifacts.require("Raven");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Raven);
};