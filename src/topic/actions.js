import _ from 'lodash';
import { NAME, PAGE_SIZE, BOTTOM_BLOCK } from './constants';
import { createResourceActions, makeAction } from '../common/utils/reduxUtils';
import Web3Manager from '../web3/Web3Manager';
import MessageTranslator from '../messages/translators';
import * as TYPE from './actionTypes';

const resourceActions = createResourceActions(NAME);

export const clearAll = () => (dispatch) => {
  return dispatch(makeAction(TYPE.CLEAR_ALL_MESSAGES));
};

// eslint-disable-next-line
export const loadTopicMessages = (fromBlock = 5039195, toBlock = 'latest', topic = '', replyTo = '0x0') => (dispatch) => {
  dispatch(makeAction(resourceActions.FETCH_PARTIAL_START));
  const contract = Web3Manager.raven;
  return new Promise((resolve, reject) => {
    const filter = topic ? { topic, replyTo } : { replyTo };
    contract.Message(filter, { fromBlock, toBlock }).get((err, result) => {
      if (!err) {
        const messages = _.map(result, message => MessageTranslator.toModel(message));
        dispatch(makeAction(resourceActions.FETCH_PARTIAL_SUCCESS, { data: messages }));
        resolve(messages);
      } else {
        dispatch(makeAction(resourceActions.FETCH_PARTIAL_ERROR, err));
        reject(err);
      }
    });
  });
};

const loadMessages = (from, to, topic, messages) => new Promise((resolve, reject) => {
  const contract = Web3Manager.raven;
  const filter = topic ? { topic, replyTo: '0x0' } : { replyTo: '0x0' };
  contract.Message(filter, { fromBlock: from, toBlock: to }).get((err, result) => {
    if (!err) {
      const newMessages = messages.concat(_.map(result, message => MessageTranslator.toModel(message)));
      if (newMessages.length < 10 && from !== BOTTOM_BLOCK) {
        const newFrom = Math.max(from - PAGE_SIZE, BOTTOM_BLOCK);
        const newTo = from;
        resolve(loadMessages(newFrom, newTo, topic, newMessages));
      }
      resolve({ from, to, newMessages });
    } else {
      reject(err);
    }
  });
});

// eslint-disable-next-line
export const loadMessagesBestEffort = (fromBlock = 0, toBlock = 'latest', topic = '') => (dispatch) => {
  dispatch(makeAction(resourceActions.FETCH_PARTIAL_START));
  const messages = [];
  return loadMessages(fromBlock, toBlock, topic, messages)
    .then(({ from, to, newMessages }) => {
      dispatch(makeAction(resourceActions.FETCH_PARTIAL_SUCCESS, { data: newMessages }));
      return { from, to, newMessages };
    })
    .catch((err) => {
      dispatch(makeAction(resourceActions.FETCH_PARTIAL_ERROR, err));
    });
};
