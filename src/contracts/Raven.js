import web3 from '../api/web3';

export const contractAbi = [{
  constant: false, inputs: [{ name: 'text', type: 'string' }, { name: 'topic', type: 'bytes32' }], name: 'sendMessage', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'text', type: 'string' }, { indexed: true, name: 'sender', type: 'address' }, { indexed: true, name: 'topic', type: 'bytes32' }], name: 'Message', type: 'event',
}];
export const contractAddress = '0x31d1692cda4fb9eb2ba3b137e8af35ec2140eb1d';
export default web3.eth.contract(contractAbi).at(contractAddress);
