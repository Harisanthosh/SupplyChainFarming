import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'), null, {});
web3.eth.getAccounts().then(console.log);
const HelloHari = new web3.eth.Contract([
    {
        "constant": false,
        "inputs": [
            {
                "name": "newTemp",
                "type": "string"
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
        "signature": "0xc8d62e69"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getTemp",
        "outputs": [
            {
                "name": "",
                "type": "string"
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
], '0xdC6350418A9045893442329EA6BEe13f195207bd', {
        defaultAccount: '0x71412a50bb47f74d513ce42ace3567407ac30176', // default from address
        defaultGasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });

export { HelloHari };