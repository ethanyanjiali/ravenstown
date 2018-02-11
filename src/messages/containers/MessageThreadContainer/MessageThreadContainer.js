import React, { Component } from 'react';
import _ from 'lodash';
import { Tag, Spin, Divider } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageList from '../../components/MessageList/MessageList';
import MessageInputBox from '../../components/MessageInputBox/MessageInputBox';
import * as messagesSelectors from '../../selectors';
import * as messagesActions from '../../actions';
import { BOTTOM_BLOCK } from '../../constants';
import './MessageThreadContainer.css';

const mapStateToProps = (state, props) => ({
  messages: messagesSelectors.getMessages(state),
  repliesList: messagesSelectors.getReplyMessagesList()(state, props),
  blockHeight: state.web3.blockHeight,
  isFetchingReplies: messagesSelectors.getIsFetchingReplies(state),
  isFetchingMessage: messagesSelectors.getIsFetchingMessage(state),
});

class MessageThreadContainer extends Component {
  state = {
    messageInput: null,
  }

  componentDidMount() {
    const { txHash, dispatch, messages } = this.props;
    if (txHash) {
      if (!messages[txHash]) {
        dispatch(messagesActions.fetchSingleMessage(txHash));
      }
      dispatch(messagesActions.loadRepliesBestEffort(BOTTOM_BLOCK, 'latest', '', txHash));
    }
  }

  componentWillReceiveProps(newProps) {
    const { dispatch, txHash, messages } = this.props;
    const hashChanged = txHash !== newProps.txHash && newProps.txHash;
    if (hashChanged) {
      if (!messages[newProps.txHash]) {
        dispatch(messagesActions.fetchSingleMessage(newProps.txHash));
      }
      dispatch(messagesActions.loadRepliesBestEffort(BOTTOM_BLOCK, 'latest', '', newProps.txHash));
    }
  }

  handleMessageInputChange = (event) => {
    const { target: { value } } = event;
    if (value && value.length < 280) {
      this.setState({
        messageInput: value,
        messageError: null,
      });
    } else {
      this.setState({
        messageError: 'Maximum 280 characters are allowed.',
      });
    }
  }

  handleSubmitMessage = () => {
    const { dispatch, txHash } = this.props;
    const { messageInput } = this.state;
    dispatch(messagesActions.sendMessage(messageInput, '', txHash))
      .then((tx) => {
        dispatch(messagesActions.addPendingMessage(tx));
        this.setState({
          messageInput: '',
        });
      });
  }

  render() {
    const {
      isFetchingReplies,
      messages,
      txHash,
      repliesList,
    } = this.props;
    const { messageError, messageInput } = this.state;
    const message = messages[txHash];
    return (
      <div>
        { message &&
          <div>
            <div>
              <div className='message-thread-head-text'>
                { !_.isEmpty(message.topic) && <Tag color='#81c8ee'>#{ message.topic }</Tag> }
                { message.text }
              </div>
              <div className='message-thread-head-sender'>
                From: { message.sender }
              </div>
              <div className='message-thread-head-time'>
                Block Time: { message.timestamp }
              </div>
            </div>
            <Divider />
            <div className='message-thread-message-input'>
              <MessageInputBox
                noTopic
                error={ messageError }
                value={ messageInput }
                buttonText='Reply'
                onChange={ this.handleMessageInputChange }
                onSubmit={ this.handleSubmitMessage }
              />
            </div>
            { !_.isEmpty(repliesList) &&
              <div className='message-thread-list'>
                <MessageList
                  list={ repliesList }
                  isLoadingNextPage={ isFetchingReplies }
                  hasNextPage={ false }
                />
              </div> }
            {
              isFetchingReplies && <Spin />
            }
          </div> }
        { !message && <Spin /> }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(MessageThreadContainer));
