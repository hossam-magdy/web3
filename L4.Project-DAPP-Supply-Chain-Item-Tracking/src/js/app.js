App = {
  web3Provider: null,
  contracts: {},
  emptyAddress: '0x0000000000000000000000000000000000000000',
  sku: 0,
  upc: 0,
  metamaskAccountID: '0x0000000000000000000000000000000000000000',
  ownerID: '0x0000000000000000000000000000000000000000',
  originFarmerID: '0x0000000000000000000000000000000000000000',
  originFarmName: null,
  originFarmInformation: null,
  originFarmLatitude: null,
  originFarmLongitude: null,
  productNotes: null,
  productPrice: 0,
  distributorID: '0x0000000000000000000000000000000000000000',
  retailerID: '0x0000000000000000000000000000000000000000',
  consumerID: '0x0000000000000000000000000000000000000000',

  init: async () => {
    App.readForm();
    /// Setup access to blockchain
    return await App.initWeb3();
  },

  readForm: () => {
    App.sku = document.getElementById('sku').value;
    App.upc = document.getElementById('upc').value;
    App.ownerID = document.getElementById('ownerID').value;
    App.originFarmerID = document.getElementById('originFarmerID').value;
    App.originFarmName = document.getElementById('originFarmName').value;
    App.originFarmInformation = document.getElementById(
      'originFarmInformation'
    ).value;
    App.originFarmLatitude =
      document.getElementById('originFarmLatitude').value;
    App.originFarmLongitude = document.getElementById(
      'originFarmLongitude'
    ).value;
    App.productNotes = document.getElementById('productNotes').value;
    App.productPrice = document.getElementById('productPrice').value;
    App.distributorID = document.getElementById('distributorID').value;
    App.retailerID = document.getElementById('retailerID').value;
    App.consumerID = document.getElementById('consumerID').value;

    console.log('readForm', [
      App.sku,
      App.upc,
      App.ownerID,
      App.originFarmerID,
      App.originFarmName,
      App.originFarmInformation,
      App.originFarmLatitude,
      App.originFarmLongitude,
      App.productNotes,
      App.productPrice,
      App.distributorID,
      App.retailerID,
      App.consumerID,
    ]);
  },

  handleCallResult: (promise, logKey = '') => {
    promise
      .then((result) => {
        document.getElementById('ftc-item').innerText = JSON.stringify(
          result,
          null,
          2
        );
        console.log(`[${logKey}]`, result);
      })
      .catch((err) => {
        console.error(`[${logKey}]`, err.message);
      });
  },

  initWeb3: async () => {
    /// Find or Inject Web3 Provider
    /// Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error('User denied account access');
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:7545'
      );
    }

    App.getMetaskAccountID();

    return App.initSupplyChain();
  },

  getMetaskAccountID: () => {
    web3 = new Web3(App.web3Provider);

    // Retrieving accounts
    web3.eth.getAccounts((err, res) => {
      if (err) {
        console.log('Error:', err);
        return;
      }
      console.log('getMetaskID:', res);
      App.metamaskAccountID = res[0];
    });
  },

  initSupplyChain: async () => {
    /// Source the truffle compiled smart contracts
    const jsonSupplyChain = '../../build/contracts/SupplyChain.json';
    const networkId = await web3.eth.net.getId();

    /// JSONfy the smart contracts
    fetch(jsonSupplyChain)
      .then((response) => response.json())
      .then((artifact) => {
        // get contract instance
        const deployedNetwork = artifact.networks[networkId];
        App.contracts.SupplyChain = new web3.eth.Contract(
          artifact.abi,
          deployedNetwork.address,
          {
            from: App.metamaskAccountID,
            // gas: 21000,
          }
        );
        console.log('Contract', {
          Address: deployedNetwork.address,
          Artifact: artifact,
          Instance: App.contracts.SupplyChain,
        });

        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
        App.fetchEvents();
      });

    return App.bindEvents();
  },

  bindEvents: () => {
    [...document.querySelectorAll('button')].map((i) =>
      i.addEventListener('click', App.handleButtonClick)
    );
  },

  handleButtonClick: async (event) => {
    event.preventDefault();
    App.getMetaskAccountID();
    const processId = parseInt(event.target.getAttribute('data-id'));
    console.log('ButtonClicked - processId: ', processId);
    switch (processId) {
      case 1:
        return await App.harvestItem(event);
      case 2:
        return await App.processItem(event);
      case 3:
        return await App.packItem(event);
      case 4:
        return await App.sellItem(event);
      case 5:
        return await App.buyItem(event);
      case 6:
        return await App.shipItem(event);
      case 7:
        return await App.receiveItem(event);
      case 8:
        return await App.purchaseItem(event);
      case 9:
        return await App.fetchItemBufferOne(event);
      case 10:
        return await App.fetchItemBufferTwo(event);
    }
  },

  harvestItem: () => {
    App.handleCallResult(
      App.contracts.SupplyChain.methods
        .harvestItem(
          App.upc,
          App.metamaskAccountID,
          App.originFarmName,
          App.originFarmInformation,
          App.originFarmLatitude,
          App.originFarmLongitude,
          App.productNotes
        )
        .send(),
      'harvestItem'
    );
  },

  processItem: () => {
    App.handleCallResult(
      App.contracts.SupplyChain.methods.processItem(App.upc).send(),
      'processItem'
    );
  },

  packItem: () => {
    App.handleCallResult(
      App.contracts.SupplyChain.methods.packItem(App.upc).send(),
      'packItem'
    );
  },

  sellItem: () => {
    const productPrice = web3.utils.toWei('1', 'ether');
    console.log('productPrice', productPrice);
    App.handleCallResult(
      App.contracts.SupplyChain.methods
        .sellItem(App.upc, App.productPrice)
        .send(),
      'sellItem'
    );
  },

  buyItem: () => {
    const walletValue = web3.utils.toWei('3', 'ether');
    App.handleCallResult(
      App.contracts.SupplyChain.methods
        .buyItem(App.upc)
        .send({ from: App.metamaskAccountID, value: walletValue }),
      'buyItem'
    );
  },

  shipItem: () => {
    App.handleCallResult(
      App.contracts.SupplyChain.methods.shipItem(App.upc).send(),
      'shipItem'
    );
  },

  receiveItem: () => {
    App.handleCallResult(
      App.contracts.SupplyChain.methods.receiveItem(App.upc).send(),
      'receiveItem'
    );
  },

  purchaseItem: () => {
    App.handleCallResult(
      App.contracts.SupplyChain.methods.purchaseItem(App.upc).send(),
      'purchaseItem'
    );
  },

  fetchItemBufferOne: () => {
    App.upc = document.getElementById('upc').value;
    console.log('upc', App.upc);

    App.handleCallResult(
      App.contracts.SupplyChain.methods.fetchItemBufferOne(App.upc).call(),
      'fetchItemBufferOne'
    );
  },

  fetchItemBufferTwo: () => {
    App.handleCallResult(
      App.contracts.SupplyChain.methods.fetchItemBufferTwo(App.upc).call(),
      'fetchItemBufferTwo'
    );
  },

  fetchEvents: () => {
    if (
      typeof App.contracts.SupplyChain.currentProvider.sendAsync !== 'function'
    ) {
      App.contracts.SupplyChain.currentProvider.sendAsync = () => {
        return App.contracts.SupplyChain.currentProvider.send.apply(
          App.contracts.SupplyChain.currentProvider,
          arguments
        );
      };
    }

    App.contracts.SupplyChain.events.allEvents({}, (err, log) => {
      console.log(`[event]:${log.event}`, 'args:', log.returnValues, {
        err,
        log,
      });
      if (!err)
        document
          .getElementById('ftc-events')
          .insertAdjacentHTML(
            'beforeend',
            `<li>${log.event} - ${log.transactionHash}</li>`
          );
    });
  },
};

window.addEventListener('load', () => {
  App.init();
});
