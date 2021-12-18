const { SHA256 } = require("crypto-js");

const calculateBlockHash = (block) => {
  const { hash, ...blockWithoutHash } = block;
  return SHA256(JSON.stringify(blockWithoutHash)).toString()
};

module.exports.calculateBlockHash = calculateBlockHash;
