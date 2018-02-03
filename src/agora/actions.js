import _ from 'lodash';
import { NAME, PAGE_SIZE } from './constants';
import { createResourceActions, makeAction } from '../common/utils/reduxUtils';
import Web3Manager from '../web3/Web3Manager';
import MessageTranslator from '../messages/translators';

const resourceActions = createResourceActions(NAME);

// eslint-disable-next-line
export const loadAgoraMessages = (fromBlock = 0, toBlock = 'latest') => (dispatch) => {
  dispatch(makeAction(resourceActions.FETCH_PARTIAL_START));
  const contract = Web3Manager.raven;
  return new Promise((resolve, reject) => {
    contract.Message({}, { fromBlock, toBlock }).get((err, result) => {
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

const loadMessages = (from, to, messages) => new Promise((resolve, reject) => {
  const contract = Web3Manager.raven;
  contract.Message({}, { fromBlock: from, toBlock: to }).get((err, result) => {
    if (!err) {
      const newMessages = messages.concat(_.map(result, message => MessageTranslator.toModel(message)));
      if (newMessages.length < 10 && from !== 0) {
        const newFrom = Math.max(from - PAGE_SIZE, 0);
        const newTo = from;
        resolve(loadMessages(newFrom, newTo, newMessages));
      }
      resolve({ from, to, newMessages });
    } else {
      reject(err);
    }
  });
});

// eslint-disable-next-line
export const loadMessagesBestEffort = (fromBlock = 0, toBlock = 'latest') => (dispatch) => {
  dispatch(makeAction(resourceActions.FETCH_PARTIAL_START));
  const messages = [];
  return loadMessages(fromBlock, toBlock, messages)
    .then(({ from, to, newMessages }) => {
      dispatch(makeAction(resourceActions.FETCH_PARTIAL_SUCCESS, { data: newMessages }));
      return { from, to, newMessages };
    })
    .catch((err) => {
      dispatch(makeAction(resourceActions.FETCH_PARTIAL_ERROR, err));
    });
};
