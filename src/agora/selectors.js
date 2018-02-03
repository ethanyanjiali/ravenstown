import { createSelector } from 'reselect';
import _ from 'lodash';

export const getAgoraMessages = state => state.agora.normalized;
export const getIsFetching = state => state.agora.isFetchingPartial;

export const getAgoraMessagesList = createSelector(
  getAgoraMessages,
  messages => _.orderBy(_.values(messages), ['timestamp', 'sender'], 'desc'),
);
