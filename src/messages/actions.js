import { makeAction } from '../common/utils/reduxUtils';
import * as TYPES from './actionTypes';
import Web3Manager from '../web3/Web3Manager';

export const sendMessage = (message, topic = '', replyTo='0x0') => (dispatch) => {
  dispatch(makeAction(TYPES.SEND_MESSAGE_START));
  Web3Manager.raven.sendMessage(message, topic, replyTo, (err, result) => {
    if (!err) {
      console.log(result);
      dispatch(makeAction(TYPES.SEND_MESSAGE_SUCCESS));
    } else {
      dispatch(makeAction(TYPES.SEND_MESSAGE_ERROR, err));
    }
  });
};
