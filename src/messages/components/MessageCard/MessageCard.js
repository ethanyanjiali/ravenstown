import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './MessageCard.css';

export default class MessageCard extends Component {
  render() {
    const { children, sender, timestamp } = this.props;
    return (
      <div className='message-card-container'>
        <div className='message-card-content'>
          { children }
        </div>
        <div className='message-card-meta'>
          <div className='message-card-sender'>
            { sender }
          </div>
          <div className='message-card-timestamp'>
            { moment.unix(timestamp).format('HH:MM MM/DD/YYYY') }
          </div>
        </div>
      </div>
    );
  }
}

MessageCard.propTypes = {
  children: PropTypes.element.isRequired,
  sender: PropTypes.string,
  timestamp: PropTypes.number,
};
