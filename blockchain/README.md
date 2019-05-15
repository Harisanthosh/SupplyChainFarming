NOTE:

Deployments to Ropsten Node is not working follow stack exchange
https://ethereum.stackexchange.com/questions/68817/truffle-migrate-network-ropsten-issues

Run truffle develop to kickstart server
1. Run truffle compile --reset --all
2. Run truffle migrate 
3. Run truffle console

Test Command:
HelloHari.deployed().then(function(instance){return instance.sayHello()});

Latest Deployment Details:
2_deploy_contracts.js
=====================

   Deploying 'HelloHari'
   ---------------------
   > transaction hash:    0xc86cc3a0012d3adcde001e94ad7587ceff51b0d0840e333607f734b8cf32c3d4
   > Blocks: 0            Seconds: 0
   > contract address:    0x2505350311B99cD3489F2D1310B5F510081bFC4B
   > block number:        8
   > block timestamp:     1555957586
   > account:             0xb7F73997B962D4E9c2B7b3B508f22c4Cfd31Ba27
   > balance:             99.97711554
   > gas used:            136363
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00272726 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00272726 ETH