import React, { Component } from 'react';
import SideNavItem from '../../components/SideNavItem/SideNavItem';
import './SideNavContainer.css';

export default class SideNavContainer extends Component {

  handleClickNavItem = (navId) => {
    console.log(navId);
  }

  render() {
    return <div className='sidenav-container'>
      <div className='sidenav-logo'>Raven</div>
      <SideNavItem label='Agora' navId='agora' onClick={ this.handleClickNavItem } />
    </div>;
  }
}
