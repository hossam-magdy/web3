# Blockchain and Web3

Shaping my understanding of: Web3.0, blockchain, crypto, tokens, NFTs, DFS, … etc, in a bit detailed manner. Mainly via: https://udacity.com/course/nd1309.

---

https://www.udacity.com/course/blockchain-developer-nanodegree--nd1309

https://medium.com/@essentia1/why-the-web-3-0-matters-and-you-should-know-about-it-a5851d63c949
https://blog.coinbase.com/understanding-web-3-a-user-controlled-internet-a39c21cf83f3

https://www.youtube.com/watch?v=wHTcrmhskto
https://blockchainhub.net/web3-decentralized-web/
https://web3.foundation/about/
https://web3-technology-stack.readthedocs.io/en/latest/
https://web3js.readthedocs.io

https://ethereum.org/en/developers/docs
https://docs.soliditylang.org
https://docs.chain.link
https://github.com/paritytech/substrate

---

DAPP UX best practices (L5.6):

- [Waiting]: Waiting times in dapps are much longer than web apps. Show estimate of the waiting time … there are libraries for that.
- [Impact]: Show upfront what will happen when a user takes an action, especially when tx changing state or financial tx (will the user lose money, will it work or the process be finished, what's the step after that, …)
- [Cost]: Communicate clearly the transaction cost, and that it is not charged by the service (but it's a blockchain cost), and if tx is not fully complete, a portion of the tx cost will still be paid/levied
- [Events]: Provide in the app an ability to easily surface the events (indicator that goes to different view, toast mechanism). Also avoid annoying/disturbance, so provide a way to group, filter, and squash them. Maybe in the smart contract, priority indicator before deciding to emit event, or emit the events with standard value designed for client apps.
- [Provenance]: Clarify source, privacy and trustworthy data at every interaction; What data is coming from a blockchain and is public, what is coming from database and semi-private, and what is coming from a 3rd-party oracle that you have no control over.
- [Addresses]: 0x… are pretty alien concept to users. Make it easy: don't show the full address (show ellipsis), make it easily visible when needed/requested/hovered, make it easy to copy if needed, and make sure the address is selectable.
- [History]: Show the history of the interactions. Do not expect users having congitive load of remembering what, when, ahy they took actions. Because the time between action and its result can be long, so put the user back in the context when results come in.
- [Context]: You can give the user ability to "test" the DAPP by "Hey, use testnet". Always display the context name (mainnet, testnet, …) clearly, possibly use colors. Clarify the state: if tx result in financial action with real money, it is super important to show that upfront. Make it clear if a tx is in pending state, so users don't try and re-do it.
- [Privacy]: Always be aware that there is no privacy on public blockchain. If any sensitive information (encrypted files on IPFS, hash on blockchain).
- [Affordance]: **Do not make the user think**. Make it clear what they just did, what the actions the are about to do. Make things super intuitive, that doesn't require user to think. In DAPP, this has to be considered in smart contract and API levels.
