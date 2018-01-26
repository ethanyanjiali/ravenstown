import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../../common/components/Card/Card';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import MessageInputBox from '../../../messages/components/MessageInputBox/MessageInputBox';
import './AgoraContainer.css';

const mapStateToProps = state => ({
  messagesList: selectors.getAgoraMessagesList(state),
});
class AgoraContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.loadAgoraMessages());
  }

  render() {
    const { messagesList } = this.props;
    const messagesCards = messagesList.map(message => <Card key={ message.id }>{ message.text }</Card>);
    return (
      <div className='agora-container'>
        <div className='agora-messages-list'>
          { messagesCards }
        </div>
        <div className='agora-message-input'>
          <MessageInputBox />
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
