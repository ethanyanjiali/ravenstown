import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import VisibilitySensor from 'react-visibility-sensor';
import { Spin } from 'antd';
import MessageCard from '../MessageCard/MessageCard';
import './MessageList.css';

class MessageList extends PureComponent {

  render() {
    const {
      hasNextPage,
      isLoadingNextPage,
      list,
      onLoadNextPage,
    } = this.props;

    return (
      <ol className='message-list'>
        { list.map(item => (
          <li>
            <MessageCard
              key={ item.id }
              sender={ item.sender }
              timestamp={ parseInt(item.timestamp, 10) }
            >
              { item.text }
            </MessageCard>
          </li>
        ))}
        {
          hasNextPage &&
          <div className='message-list-spinner'>
            <Spin />
            <VisibilitySensor onChange={ onLoadNextPage } />
          </div>
        }
      </ol>
    );
  }
}

MessageList.defaultProps = {
  list: [],
  hasNextPage: false,
  isNextPageLoading: false,
  loadNextPage: () => {},
};

MessageList.propTypes = {
  list: PropTypes.array,
  hasNextPage: PropTypes.bool,
  isNextPageLoading: PropTypes.bool,
  loadNextPage: PropTypes.func,
};

export default MessageList;

