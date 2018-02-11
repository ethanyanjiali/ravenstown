import _ from 'lodash';
import abiDecoder from 'abi-decoder';
import moment from 'moment';
import Web3Manager from '../web3/Web3Manager';

abiDecoder.addABI(Web3Manager.ravenAbi);

export default class Translator {
  static toModel(data) {
    return {
      text: _.get(data, 'args.text'),
      id: _.get(data, 'transactionHash'),
      blockNumber: _.get(data, 'blockNumber'),
      sender: _.get(data, 'args.sender'),
      topic: Web3Manager.web3.toAscii(_.get(data, 'args.topic')).replace(/\0/g, ''),
      replyTo: _.get(data, 'args.replyTo'),
      timestamp: moment.unix(_.get(data, 'args.timestamp')).format('HH:MM MM/DD/YYYY'),
      tx: _.get(data, 'transactionHash'),
      sequence: parseInt(_.get(data, 'args.sequence'), 10),
    };
  }

  static fromTxReceipt(receipt) {
    const decodedLogs = abiDecoder.decodeLogs(receipt.logs)[0];
    return {
      id: _.get(receipt, 'transactionHash'),
      blockNumber: _.get(receipt, 'blockNumber'),
      tx: _.get(receipt, 'transactionHash'),
      text: decodedLogs.events.filter(event => event.name === 'text')[0].value,
      sender: decodedLogs.events.filter(event => event.name === 'sender')[0].value,
      topic: Web3Manager.web3.toAscii(decodedLogs.events.filter(event => event.name === 'topic')[0].value).replace(/\0/g, ''),
      replyTo: decodedLogs.events.filter(event => event.name === 'replyTo')[0].value,
      timestamp: moment.unix(decodedLogs.events.filter(event => event.name === 'timestamp')[0].value).format('HH:MM MM/DD/YYYY'),
      sequence: parseInt(decodedLogs.events.filter(event => event.name === 'sequence')[0].value, 10),
    };
  }
}
