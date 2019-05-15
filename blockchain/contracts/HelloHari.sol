pragma solidity >=0.4.21 <0.6.0;

contract HelloHari {
    //uint constant COAP_JOB = 2;
    string temp = "0";

    function setTemp(string memory newTemp) public {

       temp = newTemp;

   }

   

   function getTemp() public view returns (string memory) {

       return temp;

   }

    function sayHello() public pure returns(string memory){
        return("hello Hari");
    }
    // function coapExample() public {
    //     string memory coapServer = "eval:const coap = require('coap');  req = coap.request('coap://localhost:5683'); req.on('response', function(res) { res.pipe(process.stdout); }); req.end();";
    //     Run(DaysUntilNext15th_Id, coapServer, "", "coap", 2, DEFAULT_GAS_UNITS, DEFAULT_GAS_PRICE);    
    //     Run(
    //         COAP_JOB, /* give the job a unique ID */            
    //         /* JavaScript code I want to execute: */
    //         "module.exports = async function(CaptainJSIn) { const coap = require('coap');  req = coap.request('coap://localhost:5683'); req.on('response', function(res) { res.pipe(process.stdout); }); req.end();",
    //         Country, /* Input parameter which will result in CaptainJSIn (see above) */
    //         "coap", /* Nodejs libraries we need */
    //         3, /* we need a maximum of 3 runtime slices */
    //         200000, /* use 200,000 gas units */
    //         DEFAULT_GAS_PRICE /* use default gas price */
    //     );    
    // }
}
