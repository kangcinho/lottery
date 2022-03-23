import web3 from '../config/web3'
const {abi} = require('./lottery.json');
const serverAddress = "0x2D191d1EFc989885A0CA49e36Ff283a75cbA8165";
export default new web3.eth.Contract(abi, serverAddress);