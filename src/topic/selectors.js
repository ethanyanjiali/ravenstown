import { createSelector } from 'reselect';
import _ from 'lodash';

export const getTopicMessages = state => state.topic.normalized;
export const getIsFetching = state => state.topic.isFetchingPartial;

export const getTopicMessagesList = createSelector(
  getTopicMessages,
  messages => _.orderBy(_.values(messages), ['sequence'], 'desc'),
);
