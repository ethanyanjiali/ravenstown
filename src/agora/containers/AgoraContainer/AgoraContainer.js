import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Spin, Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { PAGE_SIZE } from '../../constants';
import MessageList from '../../../messages/components/MessageList/MessageList';
import MessageCard from '../../../messages/components/MessageCard/MessageCard';
import * as agoraActions from '../../actions';
import * as web3Actions from '../../../web3/actions';
import * as messagesActions from '../../../messages/actions';
import * as selectors from '../../selectors';
import MessageInputBox from '../../../messages/components/MessageInputBox/MessageInputBox';
import confirmTransaction from '../../../assets/confirm-transaction.png';
import './AgoraContainer.css';

const mapStateToProps = state => ({
  messagesList: selectors.getAgoraMessagesList(state),
  blockHeight: state.web3.blockHeight,
  isFetching: selectors.getIsFetching(state),
});
class AgoraContainer extends Component {

  state = {
    messageInput: '',
    isSendMessageModalVisible: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(web3Actions.getBlockHeight());
    this.checkLatestHeight = setInterval(() => dispatch(web3Actions.getBlockHeight()), 10000);
  }

  componentWillUnmount() {
    if (this.checkLatestHeight) {
      clearInterval(this.checkLatestHeight);
    }
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
    this.setState({
      isSendMessageModalVisible: true,
    });
    dispatch(messagesActions.sendMessage(messageInput));
  }

  handleLoadNextPage = (isVisible) => {
    const { isFetching, dispatch, blockHeight } = this.props;
    const { blockBottom } = this.state;
    if (isVisible && !isFetching && blockBottom !== 0) {
      const toBlock = blockBottom || blockHeight;
      const fromBlock = Math.max(toBlock - PAGE_SIZE, 0);
      dispatch(agoraActions.loadMessagesBestEffort(fromBlock, toBlock)).then(({ from }) => {
        this.setState({
          blockBottom: from,
          blockTop: blockHeight,
        });
      });
    }
  }

  handleFetchNewMessages = () => {
    const { blockTop } = this.state;
    const { blockHeight, dispatch, isFetching } = this.props;
    if (!isFetching) {
      dispatch(agoraActions.loadAgoraMessages(blockTop, blockHeight)).then(() => {
        this.setState({
          blockTop: blockHeight,
        });
      });
    }
  }

  render() {
    const { messagesList, isFetching, blockHeight } = this.props;
    const { blockBottom, blockTop, isSendMessageModalVisible } = this.state;
    return (
      <div className='agora-container'>
        <div className='agora-messages-list'>
          { blockTop && blockTop !== blockHeight &&
            <div className='more-blocks-notification' onClick={ this.handleFetchNewMessages }>
              { isFetching && <Spin /> }
              { !isFetching && <div>{ `Check messages from ${blockHeight - blockTop} new blocks.` }</div> }
            </div>
          }
          <MessageList
            list={ messagesList }
            hasNextPage={ blockBottom !== 0 && !!blockHeight }
            isNextPageLoading={ isFetching }
            onLoadNextPage={ this.handleLoadNextPage }
          />
        </div>
        <div className='agora-message-input'>
          <MessageInputBox onChange={ this.handleMessageInputChange } onSubmit={ this.handleSubmitMessage } />
        </div>
        <Modal
          title='Confirm Your Transaction'
          visible={ isSendMessageModalVisible }
          footer={null}
          closable={ false }
        >
          <div className='send-message-modal-content'>
            <p>Please confirm your transaction in MetaMask popup window. The higher the gas price is, the sooner your message will be posted.</p>
            <img className='confirm-transaction-image' src={ confirmTransaction } alt='submit-transcation' />
            <Button onClick={ () => this.setState({ isSendMessageModalVisible: false })}>OK</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

AgoraContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messagesList: PropTypes.array,
  isFetching: PropTypes.bool,
  blockHeight: PropTypes.number,
};

AgoraContainer.defaultProps = {
  messagesList: [],
  isFetching: false,
};

export default connect(mapStateToProps)(AgoraContainer);
