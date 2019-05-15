const coap = require('coap');
const express = require('express')
var cors = require('cors')

const app = express()
const port = 3809
const paramAddr = process.argv.slice(2)
console.log(`Connecting to ${paramAddr[0]}`)
const RpiAddr = paramAddr[0] ? paramAddr : '192.168.178.34'
console.log(RpiAddr)
app.use(cors())

var obj = {
    "Temp": ""
}
app.get('/', async (req, res) => {

    const newTemp = await getTemp(function (temp) {
        findTemp(temp);
        console.log("Temp after calling is " + obj["Temp"]);
        res.json(obj);
    });
    //res.send("Test!");
})

app.get('/Rpi', async(req,res) => {
    const resp = coap.request(`coap://${RpiAddr}:5683/temperature`);
    var currentTemp = "";
    resp.on('response', function (res1) {
        res1.pipe(process.stdout);
        //console.log(res.url);
        res1.on('data', function (val) {
            currentTemp += val;
            tempstring = currentTemp.split(":")[1].trim();
            console.log("C: " + tempstring);
            obj["Temp"]  = tempstring;
            //res.send(tempstring);
            res.json(obj);
            //cb(currentTemp);
        })
    });
    resp.end();
});

function findTemp(tempVal) {
    console.log("\n");
    console.log("After callback:" + tempVal);
    var pVal = tempVal.split(":")[1].trim();
    console.log("\t");
    console.log(pVal);
    obj["Temp"] = Number(pVal);
    return pVal;
}
function getTemp(cb) {
    console.log("Sending coap request !");
    const resp = coap.request('coap://192.168.99.100:5904');
    //const resp = coap.request('coap://localhost:5683');
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
