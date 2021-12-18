import { Block } from './Block';
import { SHA256 } from 'crypto-js';

/* ===== Blockchain ===================================
|  Class with a constructor for blockchain data model  |
|  with functions to support:                          |
|     - createGenesisBlock()                           |
|     - getLatestBlock()                               |
|     - addBlock()                                     |
|     - getBlock()                                     |
|     - validateBlock()                                |
|     - validateChain()                                |
|  ====================================================*/

export class Blockchain {
  chain: Block[] = [];

  constructor() {
    this.addBlock(createGenesisBlock());
  }

  getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block): void {
    if (this.chain.length > 0) {
      newBlock.previousHash = this.getLastBlock().hash;
    }

    newBlock.height = this.chain.length;
    newBlock.timestamp = new Date().getTime().toString().substr(0, -3);

    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

    this.chain.push(newBlock);
  }
}

const createGenesisBlock = () => new Block('This is Genesis Block');
