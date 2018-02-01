import React, { Component } from 'react';
import SideNavItem from '../../components/SideNavItem/SideNavItem';
import './SideNavContainer.css';
import ravenLogo from '../../../assets/logo.svg';

export default class SideNavContainer extends Component {

  handleClickNavItem = (navId) => {
    console.log(navId);
  }

  render() {
    return (
      <div className='sidenav-container'>
        <div className='sidenav-logo'>
          <img className='raven-logo' src={ ravenLogo } alt='logo' />
          <h2 className='raven-name'>RAVEN</h2>
        </div>
        <SideNavItem label='Agora' navId='agora' onClick={ this.handleClickNavItem } />
      </div>
    );
  }
}
