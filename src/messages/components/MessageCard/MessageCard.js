import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon, Tag } from 'antd';
import './MessageCard.css';

export default class MessageCard extends Component {
  render() {
    const { children, sender, timestamp, txHash, topic } = this.props;
    return (
      <div className='message-card-container'>
        <div className='message-card-content'>
          { !_.isEmpty(topic) && <Tag color="#81c8ee">#{ topic }</Tag> }
          { children }
        </div>
        { (sender || timestamp) &&
          <div className='message-card-meta'>
            <div className='message-card-sender'>
              From: { sender }
            </div>
            <div className='message-card-timestamp'>
              Block Time: { moment.unix(timestamp).format('HH:MM MM/DD/YYYY') }
            </div>
            <a style={{ color: 'inherit' }} href={ `https://etherscan.io/tx/${txHash}` } target='_blank' rel='noopener noreferrer'>
              <Icon type='search' />
            </a>
          </div>
        }
      </div>
    );
  }
}

MessageCard.propTypes = {
  children: PropTypes.element.isRequired,
  sender: PropTypes.string,
  timestamp: PropTypes.number,
  txHash: PropTypes.string,
};
