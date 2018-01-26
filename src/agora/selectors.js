import { createSelector } from 'reselect';
import _ from 'lodash';

export const getAgoraMessages = state => state.agora.normalized;

export const getAgoraMessagesList = createSelector(
  getAgoraMessages,
  messages => _.values(messages),
);
