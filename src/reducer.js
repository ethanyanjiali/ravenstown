import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import agoraReducers from './agora/reducers';
import web3Reducers from './web3/reducers';

export default combineReducers({
  form: formReducer,
  agora: combineReducers(agoraReducers),
  web3: combineReducers(web3Reducers),
});
