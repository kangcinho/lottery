const path = require('path');
const solc = require('solc');
const fs = require('fs');

const lotteryPath = path.resolve(__dirname, "Lottery", "Contract", "Lottery.sol");
const fsLottery = fs.readFileSync(lotteryPath, "utf8");

var lotterySolc = {
  language: "Solidity",
  sources: { 
    contract: {
      content: fsLottery
    }
  },
  settings: {
    optimizer: {
        enabled: true
    },
    evmVersion: "byzantium",
    outputSelection: {
      "*": {
        "": [
          "legacyAST",
          "ast"
        ],
        "*": [
          "abi",
          "evm.bytecode.object",
          "evm.bytecode.sourceMap",
          "evm.deployedBytecode.object",
          "evm.deployedBytecode.sourceMap",
          "evm.gasEstimates"
        ]
      },
    }
  }
};


lotterySolc = JSON.stringify(lotterySolc);
const lotteryContract = JSON.parse(solc.compile(lotterySolc));

const lotteryJsonPath = path.resolve(__dirname, "src", "contract", "lottery.json");
fs.writeFile(lotteryJsonPath, JSON.stringify(lotteryContract.contracts.contract.Lottery), function(err) {
    if (err) {
        console.log(err);
    }
});

module.exports = lotteryContract.contracts.contract.Lottery;
