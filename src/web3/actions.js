import * as TYPES from './actionTypes';
import { makeAction } from '../common/utils/reduxUtils';
import Web3Manager from '../web3/Web3Manager';

export const logoutMetaMask = () => (dispatch) => {
  dispatch(makeAction(TYPES.LOG_OUT));
};

export const loadMetaMaskWeb3 = () => (dispatch) => {
  dispatch(makeAction(TYPES.LOAD_WEB3_START));
  return Web3Manager.initialize()
    .then(() => {
      dispatch(makeAction(TYPES.LOAD_WEB3_SUCCESS));
      return true;
    })
    .catch((error) => {
      dispatch(makeAction(TYPES.LOAD_WEB3_ERROR, error));
      return false;
    });
};

export const getBlockHeight = () => (dispatch) => {
  dispatch(makeAction(TYPES.GET_BLOCK_HEIGHT_START));
  return new Promise((resolve, reject) => {
    const web3 = Web3Manager.web3;
    if (web3) {
      web3.eth.getBlockNumber((err, height) => {
        if (!err) {
          dispatch(makeAction(TYPES.GET_BLOCK_HEIGHT_SUCCESS, { height }));
          resolve(height);
        } else {
          dispatch(makeAction(TYPES.GET_BLOCK_HEIGHT_ERROR));
          reject(err);
        }
      });
    } else {
      reject(new Error('No web3'));
    }
  });
};
