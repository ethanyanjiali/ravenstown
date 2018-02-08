import { NAME } from './constants';
import * as TYPE from './actionTypes';
import { createResourceReducer } from '../common/utils/reduxUtils';

const resourceReducer = createResourceReducer(NAME);

const normalized = (state = {}, action) => {
  switch (action.type) {
    case TYPE.CLEAR_ALL_MESSAGES:
      return {};
    default:
      return resourceReducer.normalized(state, action);
  }
};

export default {
  ...resourceReducer,
  normalized,
};
