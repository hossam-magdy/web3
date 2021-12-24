const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic =
  'tilt lunar exile blame merry good little undo evidence useful rotate error';
// 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat';

// const { readFileSync } = require('fs');
// const infuraKey = readFileSync('.secret.infuraKey'); // '1cbe12...';
// const mnemonic = readFileSync('.secret.mnemonic').toString().trim();
// const url = `https://rinkeby.infura.io/v3/${infuraKey}`;

const url = 'http://127.0.0.1:8545/';

module.exports = {
  networks: {
    development: {
      provider: () =>
        new HDWalletProvider({ mnemonic, url, numberOfAddresses: 50 }),
      network_id: '*',
      // gas: 9999999,
    },
  },
  develop: {
    port: 8545,
  },
  compilers: {
    solc: {
      version: '^0.8.11',
    },
  },
};
