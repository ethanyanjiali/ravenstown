import _ from 'lodash';
import web3 from '../api/web3';

export default class Translator {
  static toModel(data) {
    return {
      text: _.get(data, 'args.text'),
      id: _.get(data, 'transactionHash'),
      blockNumber: _.get(data, 'blockNumber'),
      sender: _.get(data, 'args.sender'),
      topic: web3.toAscii(_.get(data, 'args.topic')),
    };
  }
}
