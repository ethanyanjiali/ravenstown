import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Spin, Modal, Button, Alert } from 'antd';
import { connect } from 'react-redux';
import { PAGE_SIZE, BOTTOM_BLOCK } from '../../constants';
import MessageList from '../../../messages/components/MessageList/MessageList';
import MessageCard from '../../../messages/components/MessageCard/MessageCard';
import * as topicActions from '../../actions';
import * as web3Actions from '../../../web3/actions';
import * as messagesActions from '../../../messages/actions';
import * as messagesSelectors from '../../../messages/selectors';
import * as selectors from '../../selectors';
import MessageInputBox from '../../../messages/components/MessageInputBox/MessageInputBox';
import MessageThreadContainer from '../../../messages/containers/MessageThreadContainer/MessageThreadContainer';
import confirmTransaction from '../../../assets/confirm-transaction.png';
import './TopicContainer.css';

const mapStateToProps = state => ({
  messagesList: selectors.getTopicMessagesList(state),
  blockHeight: state.web3.blockHeight,
  isFetching: selectors.getIsFetching(state),
  pendingCount: messagesSelectors.getPendingMessagesCount(state),
});
class TopicContainer extends Component {

  state = {
    messageInput: '',
    topicInput: '',
    searchInput: '',
    isSendMessageModalVisible: false,
    isMessageThreadVisible: false,
    txHash: null,
  };

  componentWillMount() {
    const txHash = this.getTxHashFromPathName(this.props);
    this.setState({
      txHash,
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(web3Actions.getBlockHeight());
    this.checkLatestHeight = setInterval(() => dispatch(web3Actions.getBlockHeight()), 10000);
  }

  componentWillReceiveProps(newProps) {
    const txHash = this.getTxHashFromPathName(newProps);
    if (txHash !== this.state.txHash) {
      this.setState({
        txHash,
      });
    }
  }

  componentWillUnmount() {
    if (this.checkLatestHeight) {
      clearInterval(this.checkLatestHeight);
    }
  }

  getTxHashFromPathName = (p) => {
    const { location } = p;
    const paths = location.pathname.split('/');
    if (paths.length > 2 && paths[1] === 'm') {
      return paths[2];
    }
    return null;
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

  handleTopicInputChange = (event) => {
    const { target: { value } } = event;
    this.setState({
      topicInput: value,
    });
  }

  handleSearchTopic = () => {
    const { dispatch } = this.props;
    dispatch(topicActions.clearAll());
    this.setState({
      blockBottom: null,
    });
  }

  handleSeachInputChange = (event) => {
    const { target: { value } } = event;
    this.setState({
      searchInput: value,
    });
  }

  handleSubmitMessage = () => {
    const { dispatch } = this.props;
    const { messageInput, topicInput } = this.state;
    this.setState({
      isSendMessageModalVisible: true,
    });
    dispatch(messagesActions.sendMessage(messageInput, topicInput))
      .then((tx) => {
        dispatch(messagesActions.addPendingMessage(tx));
        this.setState({
          messageInput: '',
          topicInput: '',
        });
      });
  }

  handleLoadNextPage = (isVisible) => {
    const { isFetching, dispatch, blockHeight } = this.props;
    const { blockBottom, searchInput } = this.state;
    if (isVisible && !isFetching && blockBottom !== BOTTOM_BLOCK) {
      const toBlock = blockBottom || blockHeight;
      const fromBlock = Math.max(toBlock - PAGE_SIZE, BOTTOM_BLOCK);
      dispatch(topicActions.loadMessagesBestEffort(fromBlock, toBlock, searchInput)).then(({ from }) => {
        this.setState({
          blockBottom: from,
          blockTop: blockHeight,
        });
      });
    }
  }

  handleFetchNewMessages = () => {
    const { blockTop, searchInput } = this.state;
    const { blockHeight, dispatch, isFetching } = this.props;
    if (!isFetching) {
      dispatch(topicActions.loadTopicMessages(blockTop, blockHeight, searchInput)).then(() => {
        this.setState({
          blockTop: blockHeight,
        });
      });
    }
  }

  handleCloseThread = () => {
    const { history } = this.props;
    this.setState({ isMessageThreadVisible: false });
    history.push('/');
  }

  handleClickMessage = (id) => {
    const { history, dispatch } = this.props;
    this.setState({ isMessageThreadVisible: true });
    history.push(`/m/${id}`);
  }

  render() {
    const { messagesList, isFetching, blockHeight, pendingCount } = this.props;
    const {
      blockBottom,
      blockTop,
      isSendMessageModalVisible,
      isMessageThreadVisible,
      txHash,
      messageError,
      messageInput,
    } = this.state;
    return (
      <div className='topic-container'>
        <div className='topic-search'>
          <input className='topic-search-input' onChange={ this.handleSeachInputChange } placeholder='Find a topic here' />
          <Button className='topic-search-button' onClick={ this.handleSearchTopic }>Search</Button>
        </div>
        <div className='topic-messages-list'>
          { pendingCount !== 0 && <Alert style={{ marginBottom: '20px' }} type='warning' message={ `You have ${pendingCount} message(s) pending confirmation` } /> }
          { blockTop && blockTop !== blockHeight &&
            <div className='more-blocks-notification' onClick={ this.handleFetchNewMessages }>
              { isFetching && <Spin /> }
              { !isFetching && <div>{ `Check messages from ${blockHeight - blockTop} new blocks.` }</div> }
            </div>
          }
          <MessageList
            onClickMessage={ this.handleClickMessage }
            list={ messagesList }
            hasNextPage={ blockBottom !== BOTTOM_BLOCK && !!blockHeight }
            isNextPageLoading={ isFetching }
            onLoadNextPage={ this.handleLoadNextPage }
          />
        </div>
        <div className='topic-message-input'>
          <MessageInputBox
            topicPlaceholder='# Topic'
            onChangeTopic={ this.handleTopicInputChange }
            onChange={ this.handleMessageInputChange }
            onSubmit={ this.handleSubmitMessage }
            error={ messageError }
            value={ messageInput }
          />
        </div>
        <Modal
          title='Confirm Your Transaction'
          visible={ isSendMessageModalVisible }
          footer={null}
          closable={ false }
        >
          <div className='send-message-modal-content'>
            <p>Please confirm your transaction in MetaMask popup window. It may take a while for your message to be posted. The higher the gas price is, the sooner your message will be posted.</p>
            <img className='confirm-transaction-image' src={ confirmTransaction } alt='submit-transcation' />
            <Button onClick={ () => this.setState({ isSendMessageModalVisible: false })}>OK</Button>
          </div>
        </Modal>
        <Modal
          visible={ isMessageThreadVisible }
          footer={null}
          onCancel={ this.handleCloseThread }
        >
          <MessageThreadContainer
            txHash={ txHash }
          />
        </Modal>
      </div>
    );
  }
}

TopicContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messagesList: PropTypes.array,
  isFetching: PropTypes.bool,
  blockHeight: PropTypes.number,
};

TopicContainer.defaultProps = {
  messagesList: [],
  isFetching: false,
};

export default withRouter(connect(mapStateToProps)(TopicContainer));
