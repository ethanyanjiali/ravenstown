/* eslint-disable */
import Web3 from 'web3';

class Web3Manager {

  contractAbi = [{"constant":false,"inputs":[{"name":"newLength","type":"uint256"}],"name":"setMessageMaxLength","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMessageMaxLength","outputs":[{"name":"length","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"text","type":"string"},{"name":"topic","type":"bytes32"},{"name":"replyTo","type":"address"}],"name":"sendMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"text","type":"string"},{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"topic","type":"bytes32"},{"indexed":true,"name":"replyTo","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"Message","type":"event"}];
  contractAddress = '0x0e48eae7488311533cd60032050390e963593859';

  constructor() {
    this._web3 = null;
  }

  initialize() {
    return new Promise((resolve, reject) => {
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        this._web3 = new Web3(web3.currentProvider);
        if (!this._web3.eth.accounts[0]) {
          console.log('Account not found.');
          reject('Web3 does not have any account associated with it');
        }
        this._web3.eth.defaultAccount = this._web3.eth.accounts[0];
        console.log(this._web3.eth.accounts[0]);
        console.log('Using MetaMask web3 now with account ' + this._web3.eth.defaultAccount);
        resolve(true);
      } else {
        console.log('No web3? You should consider trying MetaMask!');
        reject('No web3 detected.');
      }
    })
  }

  get raven() {
    if (this._web3) {
      return this._web3.eth.contract(this.contractAbi).at(this.contractAddress);
    }
    return null;
  }

  set web3(instance) {
    this._web3 = instance;
  }

  get web3() {
    return this._web3;
  }
}

export default new Web3Manager();
/* eslint-enable */
