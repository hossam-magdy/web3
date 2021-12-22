# Coffee Supply Chain

## UML Diagrams

### UML Activity Diagram

![UML Activity Diagram](docs/diagrams/uml-activity.png)

### UML Class Diagram

![UML Activity Diagram](docs/diagrams/uml-class.png)

### UML Sequence Diagram

![UML Sequence Diagram](docs/diagrams/uml-sequence.png)

### UML State Diagram

![UML State Diagram](docs/diagrams/uml-state.png)

## Versions used

- Truffle v5.4.25 (core: 5.4.25)
- Solidity - 0.8.11 (solc-js)
- Node v14.18.1
- Web3.js v1.5.3

## Hashes and addresses

- Contract address: [`0x82D6D90178dcEFC5f895DF798BC5C3b1489E09a8`](https://rinkeby.etherscan.io/address/0x82d6d90178dcefc5f895df798bc5c3b1489e09a8)
- Deployment Tx: [`0x2bba5f7492809f18bc565240861af44d0f910b102910a2a5df7968e49de5299c`](https://rinkeby.etherscan.io/tx/0x2bba5f7492809f18bc565240861af44d0f910b102910a2a5df7968e49de5299c)
- UI is deployed on IPFS: https://ipfs.io/ipfs/QmY6CorcYgdN9GPdoW1x47bYfyRw5pWr75grL6ZYJGprbL
- Transaction History:
  - Harvested - [`0xb22c3fed6ba47c3a6473272aecb0f9fa2b8bf685d5f1bbf98369f8856aebe2f4`](https://rinkeby.etherscan.io/tx/0xb22c3fed6ba47c3a6473272aecb0f9fa2b8bf685d5f1bbf98369f8856aebe2f4)
  - Processed - [`0x0f44d4ee6c085397e5ebb1625835d4614f897e509a493575bd34788638af2feb`](https://rinkeby.etherscan.io/tx/0x0f44d4ee6c085397e5ebb1625835d4614f897e509a493575bd34788638af2feb)
  - Packed - [`0x3b0316450a1011e157f0b1e0a106ab862ef01267be44f2f73ca627cdef720d3b`](https://rinkeby.etherscan.io/tx/0x3b0316450a1011e157f0b1e0a106ab862ef01267be44f2f73ca627cdef720d3b)
  - ForSale - [`0xbc39235bec5bff82cd26e43cfa8621fb6e06a00fb0a430857ea19c1132dea3b4`](https://rinkeby.etherscan.io/tx/0xbc39235bec5bff82cd26e43cfa8621fb6e06a00fb0a430857ea19c1132dea3b4)
  - Sold - [`0x203af880a2b2aa47891487176dadb74de0787dd4c0b06ef1160d538f15cce37c`](https://rinkeby.etherscan.io/tx/0x203af880a2b2aa47891487176dadb74de0787dd4c0b06ef1160d538f15cce37c)
  - Shipped - [`0x6d04a45d57089d037efba296e6bcd1d9386f0e44dd8adfea23114b4e0ab23cc2`](https://rinkeby.etherscan.io/tx/0x6d04a45d57089d037efba296e6bcd1d9386f0e44dd8adfea23114b4e0ab23cc2)
  - Received - [`0x80c5be2d0367911def1c206c6f7f4ddf1d5948e023de5d1bf99057d9ff044fd5`](https://rinkeby.etherscan.io/tx/0x80c5be2d0367911def1c206c6f7f4ddf1d5948e023de5d1bf99057d9ff044fd5)
  - Purchased - [`0x178d0cacb9c023eda2e240136bc3546e2e13abc951fa16d906fdf816a5447f27`](https://rinkeby.etherscan.io/tx/0x178d0cacb9c023eda2e240136bc3546e2e13abc951fa16d906fdf816a5447f27)

![Transaction History](docs/screenshot-tx-history.png)

![Full Screenshot](docs/screenshot-full.png)

<details>
<summary>Expand/Collapse starter code README</summary>

# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

The DApp User Interface when running should look like...

![truffle test](docs/images/ftc_product_overview.png)

![truffle test](docs/images/ftc_farm_details.png)

![truffle test](docs/images/ftc_product_details.png)

![truffle test](docs/images/ftc_transaction_history.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
Give examples (to be clarified)
```

### Installing

> The starter code is written for **Solidity v0.4.24**. At the time of writing, the current Truffle v5 comes with Solidity v0.5 that requires function _mutability_ and _visibility_ to be specified (please refer to Solidity [documentation](https://docs.soliditylang.org/en/v0.5.0/050-breaking-changes.html) for more details). To use this starter code, please run `npm i -g truffle@4.1.14` to install Truffle v4 with Solidity v0.4.24.

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/udacity/nd1309/tree/master/course-5/project-6
```

Change directory to `project-6` folder and install all requisite npm packages (as listed in `package.json`):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Your terminal should look something like this:

![truffle test](docs/images/ganache-cli.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

![truffle test](docs/images/truffle_compile.png)

This will create the smart contract artifacts in folder `build\contracts`.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](docs/images/truffle_migrate.png)

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

![truffle test](docs/images/truffle_test.png)

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

- [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
- [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
  to make the web faster, safer, and more open.
- [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.

## Authors

See also the list of [contributors](https://github.com/your/project/contributors.md) who participated in this project.

## Acknowledgments

- Solidity
- Ganache-cli
- Truffle
- IPFS

</details>
