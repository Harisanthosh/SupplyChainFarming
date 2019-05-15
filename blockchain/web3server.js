//import Web3 from 'web3';
const coap = require('coap');
//const resp = coap.request('coap://localhost:5683');
const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('http://localhost:8545'), null, {});

web3.eth.getAccounts().then(console.log);

// resp.on('response', function(res) {
//     //console.log(res);
//     currentTemp += res.pipe(process.stdout);
//     res.pipe(process.stdout);

//   });

function getTemp(cb) {
    const resp = coap.request('coap://localhost:5683');
    var currentTemp = "";
    resp.on('response', function (res) {
        res.pipe(process.stdout);
        //console.log(res.url);
        res.on('data', function (val) {
            //console.log("Inside dataaaa"+ val);
            currentTemp += val;
            console.log("F: " + currentTemp);
            cb(currentTemp);
        })
        // res.on('end', function() {
        //     process.exit(0);

        //   })
    });
    resp.end();
}


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

//console.log("Temp value is : " + currentTemp);
function getUpdTemp() {
    console.log("Updated Temp is : ")
    console.log(HelloHari.methods.getTemp().call().then(function (val) { console.log("\n"); console.log(val); }));
}
function findTemp(tempVal) {
    console.log("\n");
    console.log("After callback:" + tempVal);
    var pVal = tempVal.split(":")[1].trim();
    console.log("\t");
    console.log(pVal);
    //var recipient = "0x9ebeeba35572909d3cbf06040270ca4d05411af3";
    var orig = "0x71412a50bb47f74d513ce42ace3567407ac30176";
    // HelloHari.methods.setTemp(pVal).estimateGas({gas: 5000000}, function(error, gasAmount){
    //     if(gasAmount == 5000000)
    //         console.log('Method ran out of gas');
    // });

    console.log(`Length of the value is ${pVal.length}`);
    
    // HelloHari.methods.setTemp(pVal).send({ from: orig, gas: "220000" }).then(function (result) {
    //     var val = result;
    //     console.log(val);
    //     getUpdTemp();
    // });

    HelloHari.methods.setTemp(pVal).send({ from: orig, gas: "220000" }, (error, transactionHash) => {
        if(error) console.log(error);
        else console.log(transactionHash); getUpdTemp();
    });
    
    // const goTemp = async () => {
    //     console.log(("Inside async function"));
    //     await HelloHari.methods.setTemp(pVal).send({ from: orig });
    //     getUpdTemp();
    // }
    // goTemp();
}

    //     HelloHari.methods.setTemp(pVal).send({from: orig,gas: "28000"}, (error, transactionHash) => {
    //         if(error) console.log(error);
    //         else {
    //             console.log(transactionHash);
    //         }
    //     });
    // }

    getTemp(function (temp) {
        findTemp(temp);
    });

    var test = "";
    console.log(HelloHari.methods.sayHello().call().then(function (val) { test = val; console.log("\n"); console.log(val); }));
