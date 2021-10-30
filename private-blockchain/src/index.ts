// Ref: https://classroom.udacity.com/nanodegrees/nd1309/parts/6d88e60c-820f-410a-b34f-22417b798bd5/modules/67d665cc-c1b9-41d6-a74d-53d0fcd38a5a/lessons/de7d2807-718f-43db-96f4-0fd354a189eb/concepts/8249ab5b-171e-4f4e-bb37-6e56193b0415

import { Block } from './Block';
import { Blockchain } from './Blockchain';

const blockchain = new Blockchain();

const block1 = new Block('aaa');
blockchain.addBlock(block1);

const block2 = new Block('bbbb');
blockchain.addBlock(block2);

console.log(blockchain);
