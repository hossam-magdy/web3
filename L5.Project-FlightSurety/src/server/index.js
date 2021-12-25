const express = require('express');
const cors = require('cors');
const Web3 = require('web3');

const noOfOracleAccounts = 15;
const firstOracleAccountIndex = 11; // [0] is owner, [1-5] are airlines, [6-10] are passengers, so oracles start from [11-…]
const regFee = web3.utils.toWei('0.4', 'ether');
//#region Stub/hardcoded flights data
const STATUS_CODE = {
  UNKNOWN: 0,
  ON_TIME: 10,
  LATE_AIRLINE: 20,
  LATE_WEATHER: 30,
  LATE_TECHNICAL: 40,
  LATE_OTHER: 50,
};
const flights = [
  {
    flightNumber: 'Hello1',
    airline: '0xcedbf6b6f39e7ab84df5d7d881e08d8ed8918aa4',
    timestamp: 1000,
    statusCode: STATUS_CODE.ON_TIME,
  },
  {
    flightNumber: 'Hello2',
    airline: '0xecc93d9486493ed1022298d1f43305ab85b1ea70',
    timestamp: 2000,
    statusCode: STATUS_CODE.LATE_WEATHER,
  },
  {
    flightNumber: 'Hello3',
    airline: '0xb18315b66fe92ddfca9ee612eac49ea8892fc921',
    timestamp: Math.round(Date.now() / 1000 - 300),
    statusCode: STATUS_CODE.LATE_AIRLINE,
  },
  {
    flightNumber: 'Hello4',
    airline: '0xc6be1fc5561b17f70dc78d78451f1a4b6b6d44a0',
    timestamp: Math.round(Date.now() / 1000 - 400),
    statusCode: STATUS_CODE.UNKNOWN,
  },
];
const UNKNOWN_FLIGHT = {
  flightNumber: 'UNKNOWN',
  airline: '0x0000000000000000000000000000000000000000',
  timestamp: 0,
  statusCode: STATUS_CODE.UNKNOWN,
};
const getFlightByNumber = (flightNumber) =>
  flights.find((f) => f.flightNumber === flightNumber);
//#endregion

//

(async () => {
  //#region Initialize contract
  const FlightSuretyApp = require('../../build/contracts/FlightSuretyApp.json');
  const config = require('../config.json').localhost;

  const url = config.url.replace('http', 'ws');
  const wsProvider = new Web3.providers.WebsocketProvider(url);
  const web3 = new Web3(wsProvider);
  const accounts = await web3.eth.getAccounts();
  // console.log(accounts);
  web3.eth.defaultAccount = accounts[0];

  const flightSuretyApp = new web3.eth.Contract(
    FlightSuretyApp.abi,
    config.appAddress,
    // TODO remove without failure
    { gas: 220000 }
  );
  //#endregion

  // !STEP!: spin-up/register the oracles and maybe persist the state (index)
  //#region Register Oracles (send registration request to smart cpntract, get an index/ID)
  class Oracle {
    constructor(address, indexes = []) {
      /** @type string */
      this.address = address; // 0xcedbF6B6f39E7ab84dF5D7D881e08D8ed8918Aa4
      /** @type number[] */
      this.indexes = indexes.map((i) => parseInt(i)); // ['1', '2', '3']
    }
  }
  /** @type  Oracle[] */
  const oracles = [];
  for (
    let i = firstOracleAccountIndex;
    i < noOfOracleAccounts + firstOracleAccountIndex;
    i++
  ) {
    const address = accounts[i];
    console.log(
      `Requesting registeration for oracle, using account #${i}, ${address}, ${await web3.eth.getBalance(
        address
      )}`
    );
    oracles.push(new Oracle(address));
    flightSuretyApp.methods
      .registerOracle()
      .send({ from: address, value: regFee })
      .catch((e) => {
        console.error('[ERROR:registerOracle]', address, e.message, e);
      });
  }
  // Why event OracleRegistered instead of using return value of registerOracle?
  // https://ethereum.stackexchange.com/a/58238
  flightSuretyApp.events.OracleRegistered(
    { fromBlock: 0 },
    /**
     * @param {*} _err
     * @param {{returnValues: {oracleAddress: string}}} obj
     */
    async (_err, { returnValues: { oracleAddress } }) => {
      const oracleRegistered = oracles.find((o) => o.address === oracleAddress);
      // console.log('[event:OracleRegistered]', oracleAddress, oracleRegistered);
      if (oracleRegistered) {
        oracleRegistered.indexes = (
          await flightSuretyApp.methods
            .getMyIndexes()
            .call({ from: oracleRegistered.address })
        ).map((i) => parseInt(i));
        console.log(
          `Registered oracle, Address: ${
            oracleRegistered.address
          }, Indexes: [${oracleRegistered.indexes.join()}]`
        );
      }
    }
  );
  const getOraclesHavingIndex = (index) => {
    const indexNum = parseInt(`${index}`);
    return oracles.filter((o) => o.indexes.includes(indexNum));
  };
  //#endregion

  // !STEP!: send to contract the flight status (late or not), by invoking contract method
  flightSuretyApp.events.OracleRequest(
    { fromBlock: 0 },
    async (_err, event) => {
      /** @type {{returnValues: {index: string, airline: string, flight: string, timestamp: number}}} */
      const { returnValues: eventValues } = event;
      console.log('[event:OracleRequest]', eventValues);
      // const { index, airline, flight, timestamp } = eventValues;

      const flight = getFlightByNumber(eventValues.flight) || UNKNOWN_FLIGHT;
      flight.timestamp = eventValues.timestamp;

      const oraclesToReply = getOraclesHavingIndex(eventValues.index);
      console.log(
        oraclesToReply.length,
        'oraclesToReply',
        oraclesToReply.map((o) => [o.address, o.indexes.join()])
      );
      for (const oracleToReply of oraclesToReply) {
        // TODO: extract the requested flight number from event data, get its status from hardcoded flights array
        console.log('Sending reply from oracle', oracleToReply.address, [
          eventValues.index,
          flight.airline, // airline
          flight.flightNumber, // flight
          flight.timestamp, // timestamp
          flight.statusCode, // statusCode
        ]);
        await flightSuretyApp.methods
          .submitOracleResponse(
            eventValues.index, // index
            flight.airline, // airline
            flight.flightNumber, // flight
            flight.timestamp, // timestamp
            flight.statusCode // statusCode
          )
          .call({ from: oracleToReply.address });
        // console.log({ hash });
      }
    }
  );

  // !STEP!: send harcoded flight numbers and timestamps for the DAPP
  express()
    .use(cors())
    .get('/api', (_req, res) => {
      res.send({ flights });
    })
    .listen(3000, () =>
      console.log(`- Started listening at: http://localhost:3000/api`)
    );
})();
