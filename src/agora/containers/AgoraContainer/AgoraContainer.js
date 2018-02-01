import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import MessageCard from '../../../messages/components/MessageCard/MessageCard';
import * as agoraActions from '../../actions';
import * as messagesActions from '../../../messages/actions';
import * as selectors from '../../selectors';
import MessageInputBox from '../../../messages/components/MessageInputBox/MessageInputBox';
import './AgoraContainer.css';

const mapStateToProps = state => ({
  messagesList: selectors.getAgoraMessagesList(state),
});
class AgoraContainer extends Component {

  state = {
    messageInput: '',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(agoraActions.loadAgoraMessages());
    this.refreshMessages = setInterval(() => dispatch(agoraActions.loadAgoraMessages()), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshMessages);
  }

  handleMessageInputChange = (event) => {
    const { target: { value } } = event;
    this.setState({
      messageInput: value,
    });
  }

  handleSubmitMessage = () => {
    const { dispatch } = this.props;
    const { messageInput } = this.state;
    dispatch(messagesActions.sendMessage(messageInput));
  }

  render() {
    const { messagesList } = this.props;
    const messagesCards = _.reverse(messagesList.map(message => (
      <MessageCard
        key={ message.id }
        sender={ message.sender }
        timestamp={ parseInt(message.timestamp, 10) }
      >
        { message.text }
      </MessageCard>
    )));
    return (
      <div className='agora-container'>
        <div className='agora-messages-list'>
          { messagesCards }
        </div>
        <div className='agora-message-input'>
          <MessageInputBox onChange={ this.handleMessageInputChange } onSubmit={ this.handleSubmitMessage } />
        </div>
      </div>
    );
  }
}

AgoraContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messagesList: PropTypes.array,
};

AgoraContainer.defaultProps = {
  messagesList: [],
};

export default connect(mapStateToProps)(AgoraContainer);
