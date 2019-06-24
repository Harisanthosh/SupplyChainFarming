Welcome to Supply Chain Traccking Demo :

Our Demo comprises of three parts:

#IoT Part
I am going to start the node server and connect to my Raspberry Pi to measure the temperature data.

We use the Rule engine to create the dashboard and also to send data to AWS

1. Using IoT and sensors to monitor the health of the farming land to aid the farmers, this is done by customizing
the opensource Thingsboard.io dashboard to suit our needs. We are using Raspberry Pi and DHT 22 to get the temperature
and process it. We are using CoAP (Constrained Application Protocol) as our IoT Protocol

#AWS Part (Cloud and ML)
2. Sending data from IoT dashboard to AWS by triggering a Lambda Serverless function to write it into AWS cloudlogs
and build a Machine Learning model based on the data generated

The IoT dashboard sends data to SNS Topic, Lambda function will be triggered from there, and write the values to cloudwatch logs


Now lets move into the intresting part, the DLT 
#Distributed Ledger Part(Blockchain)
3. A User application to track the supply chain in Farming by monitoring the ownership and the state of the goods
transisted by monitoring the temperature consistently and update it in , by automatic rule updation in Smart contract.
We have used Ethereum based Quorum. 

Right now the goods is with the farmer, and the temp value is updated
in his bucket.

Now lets transfer this data to Processor the value will be logged in DLT (Blockchain)

After the ownership is transferred, all data will be saved into the new owners bucket

Owner the transaction is complete, the chain will be saved.

For queries feel free to contact us

