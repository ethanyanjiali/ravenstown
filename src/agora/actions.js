import _ from 'lodash';
import { NAME } from './constants';
import { createResourceActions, makeAction } from '../common/utils/reduxUtils';
import Web3Manager from '../web3/Web3Manager';
import MessageTranslator from '../messages/translators';

const resourceActions = createResourceActions(NAME);

// eslint-disable-next-line
export const loadAgoraMessages = (fromBlock = 0, toBlock = 'latest') => (dispatch) => {
  dispatch(makeAction(resourceActions.FETCH_PARTIAL_START));
  const contract = Web3Manager.raven;
  contract.Message({}, { fromBlock, toBlock }).get((err, result) => {
    if (!err) {
      const messages = _.map(result, message => MessageTranslator.toModel(message));
      dispatch(makeAction(resourceActions.FETCH_PARTIAL_SUCCESS, { data: messages }));
      console.log(messages);
    } else {
      dispatch(makeAction(resourceActions.FETCH_PARTIAL_ERROR, err));
    }
  });
};
