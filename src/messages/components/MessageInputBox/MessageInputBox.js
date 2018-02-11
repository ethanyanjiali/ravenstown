import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './MessageInputBox.css';

export default class MessageInputBox extends Component {
  render() {
    const { buttonText, noTopic, onChange, placeholder, onSubmit, onChangeTopic, topicPlaceholder, error, value } = this.props;
    return (
      <div className='message-input-box'>
        { !noTopic && <input className='topic-input' type='text' onChange={ onChangeTopic } placeholder={ topicPlaceholder } /> }
        <div className='message-input-with-error'>
          <input value={ value } className='message-input' type='text' onChange={ onChange } placeholder={ placeholder } />
          { error && <div className='message-error'>{ error }</div> }
        </div>
        <Button className='message-send' onClick={ onSubmit }>{ buttonText }</Button>
      </div>
    );
  }
}

MessageInputBox.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.node,
  onSubmit: PropTypes.func,
  noTopic: PropTypes.bool,
};

MessageInputBox.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  placeholder: 'Type your message here.',
  buttonText: 'Send',
};
