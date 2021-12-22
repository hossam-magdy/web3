const HDWallet = require('@truffle/hdwallet-provider');
const { readFileSync } = require('fs');

const infuraKey = readFileSync('.secret.infuraKey'); // '1cbe12...';
const mnemonic = readFileSync('.secret.mnemonic').toString().trim();

module.exports = {
  networks: {
    rinkeby: {
      provider: () =>
        new HDWallet(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4, // Rinkeby's id
    },

    // Default network of `truffle test`
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*', // Match any network id
    },
    // Port of the `truffle develop` cmd
    develop: {
      port: 9545,
    },
  },
  compilers: {
    solc: {
      version: '0.8.11',
    },
  },
};
