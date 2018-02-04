import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as web3Actions from '../../../web3/actions';
import SideNavItem from '../../components/SideNavItem/SideNavItem';
import './SideNavContainer.css';
import ravenLogo from '../../../assets/logo.svg';

const mapStateToProps = state => ({
  isWeb3Loaded: state.web3.isWeb3Loaded,
});

class SideNavContainer extends Component {

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

  render() {
    const { isWeb3Loaded } = this.props;

    return (
      <div className='sidenav-container'>
        <div className='sidenav-logo'>
          <img className='raven-logo' src={ ravenLogo } alt='logo' />
          <h2 className='raven-name'>RAVEN</h2>
        </div>
        <SideNavItem label='Agora' navId='agora' onClick={ this.handleClickNavItem } />
        { isWeb3Loaded && <SideNavItem label='Log Out' navId='logout' onClick={ this.handleClickNavItem } /> }
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
