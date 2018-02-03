import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PAGE_SIZE } from '../../constants';
import MessageList from '../../../messages/components/MessageList/MessageList';
import * as agoraActions from '../../actions';
import * as web3Actions from '../../../web3/actions';
import * as messagesActions from '../../../messages/actions';
import * as selectors from '../../selectors';
import MessageInputBox from '../../../messages/components/MessageInputBox/MessageInputBox';
import './AgoraContainer.css';

const mapStateToProps = state => ({
  messagesList: selectors.getAgoraMessagesList(state),
  blockHeight: state.web3.blockHeight,
  isFetching: selectors.getIsFetching(state),
});
class AgoraContainer extends Component {

  state = {
    messageInput: '',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(web3Actions.getBlockHeight());
  }

  componentWillUnmount() {
    if (this.refreshMessages) {
      clearInterval(this.refreshMessages);
    }
  }

  getNewBlockBottom = (currentButtom) => {
    const newBottom = currentButtom - PAGE_SIZE < 0 ? 0 : currentButtom - PAGE_SIZE;
    return newBottom;
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

  handleLoadNextPage = (isVisible) => {
    const { isFetching, dispatch, blockHeight } = this.props;
    const { blockBottom } = this.state;
    if (isVisible && !isFetching && blockBottom !== 0) {
      const toBlock = blockBottom || blockHeight;
      const fromBlock = this.getNewBlockBottom(toBlock);
      dispatch(agoraActions.loadMessagesBestEffort(fromBlock, toBlock)).then(({ from }) => {
        this.setState({
          blockBottom: from,
        });
      });
    }
  }

  render() {
    const { messagesList, isFetching, blockHeight } = this.props;
    const { blockBottom } = this.state;
    return (
      <div className='agora-container'>
        <div className='agora-messages-list'>
          <MessageList
            list={ messagesList }
            hasNextPage={ blockBottom !== 0 && blockHeight }
            isNextPageLoading={ isFetching }
            onLoadNextPage={ this.handleLoadNextPage }
          />
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
  isFetching: PropTypes.bool,
};

AgoraContainer.defaultProps = {
  messagesList: [],
  isFetching: false,
};

export default connect(mapStateToProps)(AgoraContainer);
