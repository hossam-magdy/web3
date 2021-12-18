import { Hash, Timestamp } from './types';

export class Block {
  hash: Hash = '';
  previousHash: Hash = '';
  body: any; //string | number | string[] | number[];
  height: number = 0;
  timestamp: Timestamp = 0;

  constructor(data: any) {
    this.body = data;
  }
}
