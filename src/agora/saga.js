import { takeEvery, put, call } from 'redux-saga/effects';
import _ from 'lodash';
import { makeAction } from '../common/utils/reduxUtils';
import actions from './actions';
import web3 from '../api/web3';
import RavenContract from '../contracts/Raven';

export function* asyncFetchAgoraMessages(action) {
  try {
    const { fromBlock = 0, toBlock = 'latest' } = action.payload || {};
    yield put(makeAction(actions.FETCH_PARTIAL_START));
    const filter = RavenContract.Message({}, { fromBlock, toBlock });
    const callback = (err, result) => {
      if (!err) {
        const logs = result && result.map(record => _.get(record, 'args.text'));
        console.log(result);
      }
    };
    const data = yield call(filter.get, callback);
    debugger;
    yield put(makeAction(actions.FETCH_PARTIAL_SUCCESS, { data }));
    return data;
  } catch (error) {
    yield put(makeAction(actions.FETCH_PARTIAL_ERROR, { error }));
    return error;
  }
}

export const adAccountSagas = [
  takeEvery(actions.ASYNC_LOAD_AGORA_MESSAGES, asyncFetchAgoraMessages),
];
