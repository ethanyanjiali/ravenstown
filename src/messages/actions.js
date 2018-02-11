import _ from 'lodash';
import { makeAction, createResourceActions } from '../common/utils/reduxUtils';
import * as TYPES from './actionTypes';
import Web3Manager from '../web3/Web3Manager';
import MessageTranslator from '../messages/translators';
import { NAME, PAGE_SIZE, BOTTOM_BLOCK } from './constants';

const resourceActions = createResourceActions(NAME);
const repliesActions = createResourceActions('replies');

export const clearAllReplies = () => dispatch => dispatch(makeAction(TYPES.CLEAR_ALL_REPLIES));


export const sendMessage = (message, topic = '', replyTo = '0x0') => (dispatch) => {
  dispatch(makeAction(TYPES.SEND_MESSAGE_START));
  return new Promise((resolve, reject) =>
    Web3Manager.raven.sendMessage(message, topic, replyTo, (err, result) => {
      if (!err) {
        dispatch(makeAction(TYPES.SEND_MESSAGE_SUCCESS));
        resolve(result);
      } else {
        dispatch(makeAction(TYPES.SEND_MESSAGE_ERROR, err));
        reject(err);
      }
    }));
};

export const fetchSingleMessage = txId => (dispatch) => {
  dispatch(makeAction(resourceActions.FETCH_START));
  return new Promise((resolve, reject) =>
    Web3Manager.web3.eth.getTransactionReceipt(txId, (err, result) => {
      if (!err) {
        const message = MessageTranslator.fromTxReceipt(result);
        dispatch(makeAction(resourceActions.FETCH_SUCCESS, { data: message }));
        resolve(message);
      } else {
        dispatch(makeAction(resourceActions.FETCH_SUCCESS, err));
        reject(err);
      }
    }));
};

const loadReplies = (from, to, topic, replyTo, messages) => new Promise((resolve, reject) => {
  const contract = Web3Manager.raven;
  const filter = replyTo ? { replyTo } : {};
  contract.Message(filter, { fromBlock: from, toBlock: to }).get((err, result) => {
    if (!err) {
      const newMessages = messages.concat(_.map(result, message => MessageTranslator.toModel(message)));
      resolve(newMessages);
    } else {
      reject(err);
    }
  });
});

// eslint-disable-next-line
export const loadRepliesBestEffort = (fromBlock = 0, toBlock = 'latest', topic = '', replyTo = '0x0') => (dispatch) => {
  dispatch(makeAction(repliesActions.FETCH_ALL_START, { id: replyTo }));
  const messages = [];
  return loadReplies(fromBlock, toBlock, topic, replyTo, messages)
    .then((newMessages) => {
      dispatch(makeAction(repliesActions.FETCH_ALL_SUCCESS, { id: replyTo, data: newMessages }));
      return newMessages;
    })
    .catch((err) => {
      dispatch(makeAction(repliesActions.FETCH_ALL_ERROR, err));
    });
};

export const addPendingMessage = txHash => (dispatch) => {
  const interval = setInterval(() => {
    Web3Manager.web3.eth.getTransactionReceipt(txHash, (err) => {
      if (!err) {
        clearInterval(interval);
        dispatch(makeAction(TYPES.REMOVE_PENDING_MESSAGE, { txHash }));
      }
    });
  }, 10000);
  dispatch(makeAction(TYPES.ADD_PENDING_MESSAGE, { txHash }));
};
