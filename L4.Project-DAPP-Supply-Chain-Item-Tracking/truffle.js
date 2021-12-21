module.exports = {
  networks: {
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
