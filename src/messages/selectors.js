import { createSelector } from 'reselect';
import _ from 'lodash';

export const getReplyMessages = state => state.messages.replies.normalized;
export const getIsFetchingReplies = state => state.messages.replies.isFetchingAll;
export const getIsFetchingMessage = state => state.messages.isFetching;
export const getMessages = state => state.messages.normalized;
export const getTxHash = (state, props) => props.txHash;
export const getPendingMessages = state => state.messages.pendingMessages;

export const getPendingMessagesCount = createSelector(
  getPendingMessages,
  flags => _.size(_.filter(flags, _.identity)),
);

export const getReplyMessagesList = () => createSelector(
  getReplyMessages,
  getTxHash,
  (messages, txHash) => messages[txHash] && _.orderBy(_.values(messages[txHash]), ['sequence'], 'asec'),
);
