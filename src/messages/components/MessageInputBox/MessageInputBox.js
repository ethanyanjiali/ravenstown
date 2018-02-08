import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './MessageInputBox.css';

export default class MessageInputBox extends Component {
  render() {
    const { onChange, placeholder, onSubmit, onChangeTopic, topicPlaceholder } = this.props;
    return (
      <div className='message-input-box'>
        <input className='topic-input' type='text' onChange={ onChangeTopic } placeholder={ topicPlaceholder } />
        <input className='message-input' type='text' onChange={ onChange } placeholder={ placeholder } />
        <Button className='message-send' onClick={ onSubmit }>Send</Button>
      </div>
    );
  }
}

MessageInputBox.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.node,
  onSubmit: PropTypes.func,
};

MessageInputBox.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  placeholder: 'Type your message here.',
};
