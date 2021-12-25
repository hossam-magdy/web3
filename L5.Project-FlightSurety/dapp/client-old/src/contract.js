import Web3 from 'web3';
import FlightSuretyApp from '../../../build/contracts/FlightSuretyApp.json';
import Config from '../../../build/deployedConfig.json';

export default class Contract {
  constructor(network, callback) {
    const config = Config[network];
    this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
    this.flightSuretyApp = new this.web3.eth.Contract(
      FlightSuretyApp.abi,
      config.appAddress
    );
    this.initialize(callback);
    this.owner = null;
    this.airlines = [];
    this.passengers = [];
  }

  async initialize(callback) {
    const accts = await this.web3.eth.getAccounts();
    this.owner = accts[0];
    let counter = 1;
    while (this.airlines.length < 5) {
      this.airlines.push(accts[counter++]);
    }
    while (this.passengers.length < 5) {
      this.passengers.push(accts[counter++]);
    }
    // console.log(this.airlines, this.passengers);
    callback();
  }

  isOperational(callback) {
    let self = this;
    self.flightSuretyApp.methods
      .isOperational()
      .call({ from: self.owner }, callback);
  }

  fetchFlightStatus(flight, airline, callback) {
    const self = this;
    const payload = {
      airline,
      flight,
      timestamp: Math.floor(Date.now() / 1000),
    };
    console.log('starting [fetchFlightStatus]', payload);
    self.flightSuretyApp.methods
      .fetchFlightStatus(payload.airline, payload.flight, payload.timestamp)
      .send({ from: self.owner }, (error, result) => {
        callback(error, payload);
      });
  }

  onNextFlightStatusInfo(cb) {
    const self = this;
    // TODO: listen to FlightStatusInfo
    // myContract.once('MyEvent', {});
    // self.flightSuretyApp.once('FlightStatusInfo', {filter:{}}, () => {});
    self.flightSuretyApp.events.FlightStatusInfo(
      { filter: {} },
      (error, event) => {
        const { returnValues } = event || {};
        console.log('[event:FlightStatusInfo]', { error, event });
        cb(returnValues);
      }
    );
  }
}
