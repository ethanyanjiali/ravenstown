import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Card from '../../../common/components/Card/Card';
import actions from '../../actions';
import * as selectors from '../../selectors';
import { makeAction } from '../../../common/utils/reduxUtils';
import './AgoraContainer.css';

@connect(state => ({
  messagesList: getAgoraMessagesList(state),
}))
export default class AgoraContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(makeAction(actions.ASYNC_LOAD_CAMERA_ROLL_VIDEOS));
  }

  render() {
    return <div className='agora-container'><Card>something</Card></div>;
  }
}

AgoraContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
