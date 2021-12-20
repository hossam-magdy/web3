# ND1309 C2 Ethereum Smart Contracts, Tokens and Dapps

### Specs

- Truffle version: `5.4.25`, OpenZeppelin version: `4.4.1`
- ERC-721 Token Name: `HStar Token`
- ERC-721 Token Symbol: `HST`
- Token Address on Rinkeby Network: [`0xa5540796991AC0C5c347B22172dd3aAF03019bD2`](https://rinkeby.etherscan.io/address/0xa5540796991AC0C5c347B22172dd3aAF03019bD2)

<details>

<summary>Expand/Collapse</summary>

**PROJECT: Decentralized Star Notary Service Project** - For this project, you will create a DApp by adding functionality with your smart contract and deploy it on the public testnet.

### Dependencies

For this project, you will need to have:

1. **Node 14.18.1 and NPM 6.14.15**
2. **Truffle 5.4.25** - A development framework for Ethereum.
3. **Metamask: 10.7.1**
4. **[Ganache](https://www.trufflesuite.com/ganache)** - Make sure that your Ganache and Truffle configuration file have the same port.
5. **Other mandatory packages**: `web3`, `@truffle/hdwallet-provider"`, `@openzeppelin/contracts`

### Run the application

1. Clean the frontend: `cd app && rm -rf node_modules && yarn cache clean && yarn install`
2. Start Truffle by running

```shell
# For starting the development console
truffle develop
# truffle console

# For compiling the contract, inside the development console, run:
compile

# For migrating the contract to the locally running Ethereum network, inside the development console
migrate --reset

# For running unit tests the contract, inside the development console, run:
test
```

3. Frontend - Once you are ready to start your frontend, run: `cd app && yarn dev`

---

### Important

When you will add a new Rinkeyby Test Network in your Metamask client, you will have to provide:

| Network Name      | New RPC URL              | Chain ID |
| ----------------- | ------------------------ | -------- |
| Private Network 1 | `http://127.0.0.1:9545/` | 1337     |

The chain ID above can be fetched by: `cd app && node index.js`

</details>
