const express = require('express');
const http = require('http');
const Web3 = require('web3');
const FlightSuretyApp = require('../../build/contracts/FlightSuretyApp.json');
const Config = require('../config.json');

let config = Config['localhost'];
let web3 = new Web3(
  new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws'))
);
web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(
  FlightSuretyApp.abi,
  config.appAddress
);

flightSuretyApp.events.OracleRequest(
  {
    fromBlock: 0,
  },
  function (error, event) {
    if (error) console.log(error);
    console.log(event);
  }
);

const app = express();
app.get('/api', (req, res) => {
  res.send({
    message: 'An API for use with your Dapp!',
  });
});

// export default app;

const server = http.createServer(app);
server.listen(3000);
