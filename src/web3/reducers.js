import { NAME } from './constants';
import * as TYPE from './actionTypes';
import { createResourceReducer } from '../common/utils/reduxUtils';

const resourceReducer = createResourceReducer(NAME);

const isWeb3Loaded = (state = false, action) => {
  switch (action.type) {
    case TYPE.LOAD_WEB3_START:
    case TYPE.LOAD_WEB3_ERROR:
      return false;
    case TYPE.LOAD_WEB3_SUCCESS:
      return true;
    default:
      return state;
  }
};

const isWeb3Loading = (state = false, action) => {
  switch (action.type) {
    case TYPE.LOAD_WEB3_START:
      return true;
    case TYPE.LOAD_WEB3_SUCCESS:
    case TYPE.LOAD_WEB3_ERROR:
      return false;
    default:
      return state;
  }
};

export default {
  isWeb3Loaded,
  isWeb3Loading,
};
