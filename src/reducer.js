import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import web3Reducers from './web3/reducers';
import topicReducers from './topic/reducers';

export default combineReducers({
  form: formReducer,
  topic: combineReducers(topicReducers),
  web3: combineReducers(web3Reducers),
});
