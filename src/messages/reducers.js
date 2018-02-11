import { combineReducers } from 'redux';
import { NAME } from './constants';
import * as TYPE from './actionTypes';
import { createResourceReducer, createResourceActions } from '../common/utils/reduxUtils';

const resourceReducer = createResourceReducer(NAME);
const repliesReducer = createResourceReducer('replies');
const repliesActions = createResourceActions('replies');

const normalized = (state = {}, action) => {
  const { id, data } = action.payload || {};
  switch (action.type) {
    case TYPE.CLEAR_ALL_REPLIES:
      return {};
    case repliesActions.FETCH_ALL_START:
      return {
        ...state,
        [id]: {},
      };
    case repliesActions.FETCH_ALL_SUCCESS:
      return {
        ...state,
        [id]: data.reduce((result, record) => {
          result[record.id] = record;
          return result;
        }, {}),
      };
    default:
      return state;
  }
};

const pendingMessages = (state = {}, action) => {
  const { txHash } = action.payload || {};
  switch (action.type) {
    case TYPE.ADD_PENDING_MESSAGE:
      return {
        ...state,
        [txHash]: true,
      };
    case TYPE.REMOVE_PENDING_MESSAGE:
      return {
        ...state,
        [txHash]: false,
      };
    default:
      return state;
  }
};

const replies = combineReducers({
  normalized,
});

export default {
  ...resourceReducer,
  pendingMessages,
  replies,
};
