const HelloHari = artifacts.require("HelloHari");

module.exports = function(deployer) {
    deployer.deploy(HelloHari);
    // Additional contracts can be deployed here
};

// module.exports = function (deployer) {
//     deployer.then(async function () {
//         deployer.deploy(HelloHari);
//     });