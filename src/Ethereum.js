import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'), null, {});
web3.eth.getAccounts().then(console.log);
const HelloHari = new web3.eth.Contract([
  {
    "constant": false,
    "inputs": [
      {
        "name": "temperature",
        "type": "uint256",
        "indexed": false
      },
      {
        "indexed": false,
        "name": "msg",
        "type": "string"
      }
    ],
    "name": "TempAlarm",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "event",
    "signature": "0xd6f2bec984ba3ec729cbb08b0db830212a8e0d9c36b979821dd5345f9e6f85e4",
    "anonymous": false
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newTemp",
        "type": "uint256"
      }
    ],
    "name": "setTemp",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x20c6bab3"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwnerName",
        "type": "string"
      }
    ],
    "name": "setOwnerName",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x295795e2"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTemp",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x95252560"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x893d20e8"
  },
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
], '0x4Fcff23964B960cFB50f4E00B0a519BA886C0E99', {
        defaultAccount: '0x63692a3BEAB935cB5fA3f5636047E3B0470Ed115', // default from address
        defaultGasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });

export { HelloHari };