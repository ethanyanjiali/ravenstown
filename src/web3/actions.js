import * as TYPES from './actionTypes';
import { makeAction } from '../common/utils/reduxUtils';
import Web3Manager from '../web3/Web3Manager';

export const loadMetaMaskWeb3 = () => (dispatch) => {
  dispatch(makeAction(TYPES.LOAD_WEB3_START));
  return Web3Manager.initialize()
    .then(() => {
      dispatch(makeAction(TYPES.LOAD_WEB3_SUCCESS));
    })
    .catch((error) => {
      dispatch(makeAction(TYPES.LOAD_WEB3_ERROR, error));
    });
};
