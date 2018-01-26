import { NAME } from './constants';
import { createResourceReducer } from '../common/utils/reduxUtils';

const resourceReducer = createResourceReducer(NAME);

export default {
  ...resourceReducer,
};
