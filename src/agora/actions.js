import { NAME } from './constants';
import { createResourceActions } from '../common/utils/reduxUtils';

const resourceActions = createResourceActions(NAME);

export default {
  ...resourceActions,
  ASYNC_LOAD_AGORA_MESSAGES: `${NAME}/ASYNC_LOAD_DASHBOARD_DATA`,
  LOAD_AGORA_MESSAGES_START: `${NAME}/LOAD_AGORA_MESSAGES_START`,
  LOAD_AGORA_MESSAGES_SUCCESS: `${NAME}/LOAD_AGORA_MESSAGES_SUCCESS`,
  LOAD_AGORA_MESSAGES_ERROR: `${NAME}/LOAD_AGORA_MESSAGES_ERROR`,
};
