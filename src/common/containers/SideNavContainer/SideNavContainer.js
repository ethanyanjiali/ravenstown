import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import * as web3Actions from '../../../web3/actions';
import SideNavItem from '../../components/SideNavItem/SideNavItem';
import './SideNavContainer.css';
import ravenLogo from '../../../assets/logo.svg';
import ethLogo from '../../../assets/eth-logo.png';

const mapStateToProps = state => ({
  isWeb3Loaded: state.web3.isWeb3Loaded,
});

class SideNavContainer extends Component {

  state = {
    aboutModalVisible: false,
  }

  handleClickNavItem = (navId) => {
    const { dispatch } = this.props;
    switch (navId) {
      case 'logout':
        dispatch(web3Actions.logoutMetaMask());
        break;
      default:
        console.log(navId);
    }
  }

  handleClickAbout = () => {
    this.setState({
      aboutModalVisible: true,
    });
  }

  render() {
    const { isWeb3Loaded } = this.props;
    const { aboutModalVisible } = this.state;

    return (
      <div className='sidenav-container'>
        <div className='sidenav-logo'>
          <img className='raven-logo' src={ ravenLogo } alt='logo' />
          <h2 className='raven-name'>RAVENSTOWN</h2>
          <div className='version-label'>Pre-Alpha 0.0.1</div>
        </div>
        <SideNavItem label='Town Square' navId='square' onClick={ this.handleClickNavItem } />
        { isWeb3Loaded && <SideNavItem label='Log Out' navId='logout' onClick={ this.handleClickNavItem } /> }
        <SideNavItem label='About' onClick={ this.handleClickAbout } />
        <Modal
          title='About Us'
          visible={ aboutModalVisible }
          footer={null}
          closable={ false }
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
          >
            <a style={{ textAlign: 'center' }} href='https://www.ethereum.org/' target='_blank' rel='noopener noreferrer'><img style={{ width: '40%' }} src={ ethLogo } alt='ethLogo' /></a>
            <p>This project is powered by ethereum. We aim to build a decentralized space for people to talk freely. If you have any interest, or questions about upcoming new features, please contact me via liyanjia92@gmail.com</p>
            <Button onClick={ () => this.setState({ aboutModalVisible: false })}>OK</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SideNavContainer.propTypes = {
  isWeb3Loaded: PropTypes.bool,
};

SideNavContainer.defaultProps = {
  isWeb3Loaded: false,
};

export default connect(mapStateToProps)(SideNavContainer);
