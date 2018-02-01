import _ from 'lodash';
import Web3Manager from '../web3/Web3Manager';

export default class Translator {
  static toModel(data) {
    return {
      text: _.get(data, 'args.text'),
      id: _.get(data, 'transactionHash'),
      blockNumber: _.get(data, 'blockNumber'),
      sender: _.get(data, 'args.sender'),
      topic: Web3Manager.web3.toAscii(_.get(data, 'args.topic')),
      replyTo: _.get(data, 'args.replyTo'),
      timestamp: _.get(data, 'args.timestamp'),
    };
  }
}
