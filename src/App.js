import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Modal } from 'antd';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import TopicContainer from './topic/containers/TopicContainer/TopicContainer';
import SideNavContainer from './common/containers/SideNavContainer/SideNavContainer';
import Web3Manager from './web3/Web3Manager';
import * as web3Actions from './web3/actions';
import { makeAction } from './common/utils/reduxUtils';
import metamaskUnlock from './assets/metamask-unlock.png';
import { BASE_URL } from './common/constants';

const mapStateToProps = state => ({
  isWeb3Loaded: state.web3.isWeb3Loaded,
  isWeb3Loading: state.web3.isWeb3Loading,
  web3Error: state.web3.web3Error,
});

class App extends Component {

  state = {
    isLogInModalVisible: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(web3Actions.loadMetaMaskWeb3());
  }

  onSignInWithMetaMask = () => {
    const { dispatch } = this.props;
    dispatch(web3Actions.loadMetaMaskWeb3()).then((success) => {
      if (!success) {
        this.setState({
          isLogInModalVisible: true,
        });
      }
    });
  }

  render() {
    const { isWeb3Loaded, isWeb3Loading, web3Error } = this.props;
    const { isLogInModalVisible } = this.state;
    return (
      <div className='app-container'>
        <SideNavContainer />
        { !isWeb3Loaded &&
          <div className='app-landing-page'>
            <div className='app-landing-content'>
              <Button disabled={ isWeb3Loading } onClick={ this.onSignInWithMetaMask }>Sign In with MetaMask</Button>
              <div className='app-landing-divider'>
                <Divider> OR </Divider>
              </div>
              <a href='https://metamask.io/' target='_blank' rel='noreferrer noopener' className='download-metamask'>
                <img className='download-metamask-icon' src='https://github.com/ethanyanjiali/ravenstown/blob/master/src/assets/download-metamask.png?raw=true' alt='download-metamask' />
              </a>
              <p className='app-description'>Ravenstown is a decentralized platform for people to express themselves freely. All your posts will be stored on ethereum blockchain permanently, which means no one could ever modify or delete them after, even yourself.</p>
            </div>
          </div>
        }
        { isWeb3Loaded &&
          <div className='app-content-outer'>
            <div className='app-content-inner'>
              <Switch>
                <Route exact path={`${BASE_URL}/`} component={ TopicContainer } />
                <Route path={`${BASE_URL}/m`} component={ TopicContainer} />
              </Switch>
            </div>
          </div>
        }
        <Modal
          title='Set Up Your MetaMask'
          visible={ isLogInModalVisible }
          footer={null}
          closable={ false }
        >
          <div className='login-modal-content'>
            <p>Make sure to unlock MetaMask and select the correct account</p>
            <img className='unlock-image' src='https://github.com/ethanyanjiali/ravenstown/blob/master/src/assets/metamask-unlock.png?raw=true' alt='unlock' />
            <Button onClick={ () => this.setState({ isLogInModalVisible: false })}>Try Again</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isWeb3Loaded: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps)(App));
