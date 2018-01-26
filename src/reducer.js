import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import agoraReducers from './agora/reducers';

export default combineReducers({
  form: formReducer,
  agora: combineReducers(agoraReducers),
});
