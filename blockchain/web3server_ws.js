//import Web3 from 'web3';
const coap  = require('coap');
const resp = coap.request('coap://localhost:5683');
const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://localhost:9545'), null, {});

web3.eth.getAccounts().then(console.log);

resp.on('response', function(res) {
    res.pipe(process.stdout);
  });

resp.end();
const HelloHari = new web3.eth.Contract([
    {
      "constant": true,
      "inputs": [],
      "name": "sayHello",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function",
      "signature": "0xef5fb05b"
    }
  ],'0x2505350311B99cD3489F2D1310B5F510081bFC4B', {
    defaultAccount: '0xb7F73997B962D4E9c2B7b3B508f22c4Cfd31Ba27', // default from address
    defaultGasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});

// HelloHari.deploy({
//     data: '0x608060405234801561001057600080fd5b5061013f806100206000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063ef5fb05b14610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600a81526020017f68656c6c6f20486172690000000000000000000000000000000000000000000081525090509056fea165627a7a72305820c00d413cf3352781ab7aac6726de7d5105d0c1f7aaa1e73d8b6fa2b217a723d30029'
// })
// .send({
//     from: '0xb7F73997B962D4E9c2B7b3B508f22c4Cfd31Ba27',
//     gas: 1500000,
//     gasPrice: '30000000000000'
// }, (error, transactionHash) => {  console.log("Inside error1"); console.log(error) })
// .on('error', (error) => { console.log("Inside error2"); console.log(error) })
// .on('transactionHash', (transactionHash) => {console.log("Inside transactionHash"); console.log(transactionHash) })
// .on('receipt', (receipt) => {
//    console.log("Inside receipt");
//    console.log(receipt.contractAddress) // contains the new contract address
// })
// .on('confirmation', (confirmationNumber, receipt) => { console.log("Inside confirmationNumber"); console.log(confirmationNumber) })
// .then((newContractInstance) => {
//     console.log("Inside newContractInstance");
//     console.log(newContractInstance.methods.sayHello()) // instance with the new contract address
// });
var test = "";
console.log(HelloHari.methods.sayHello().call().then(function(val){ test = val; console.log("\n"); console.log(val);}));
console.log(test);