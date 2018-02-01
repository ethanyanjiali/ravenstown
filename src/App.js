import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'antd';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import AgoraContainer from './agora/containers/AgoraContainer/AgoraContainer';
import SideNavContainer from './common/containers/SideNavContainer/SideNavContainer';
import Web3Manager from './web3/Web3Manager';
import * as web3Actions from './web3/actions';
import { makeAction } from './common/utils/reduxUtils';
import downloadMetaMask from './assets/download-metamask.png';

const mapStateToProps = state => ({
  isWeb3Loaded: state.web3.isWeb3Loaded,
  isWeb3Loading: state.web3.isWeb3Loading,
});

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(web3Actions.loadMetaMaskWeb3());
  }

  onSignInWithMetaMask = () => {
    const { dispatch } = this.props;
    dispatch(web3Actions.loadMetaMaskWeb3());
  }

  render() {
    const { isWeb3Loaded, isWeb3Loading } = this.props;
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
                <img className='download-metamask-icon' src={ downloadMetaMask } alt='download-metamask' />
              </a>
            </div>
          </div>
        }
        { isWeb3Loaded &&
          <div className='app-content-outer'>
            <div className='app-content-inner'>
              <Switch>
                <Route exact path='/' component={ AgoraContainer } />
              </Switch>
            </div>
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isWeb3Loaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
