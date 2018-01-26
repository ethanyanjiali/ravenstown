import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SideNavItem.css';

export default class SideNavItem extends Component {

  render() {
    const { label, navId, onClick } = this.props;
    return <div className='sidenav-item' onClick={ () => onClick(navId) }>{ label }</div>;
  }
}

SideNavItem.propTypes = {
  label: PropTypes.element.isRequired,
  navId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
