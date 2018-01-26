import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import AgoraContainer from './agora/containers/AgoraContainer/AgoraContainer';
import SideNavContainer from './common/containers/SideNavContainer/SideNavContainer';

class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <SideNavContainer />
        <Switch>
          <Route exact path='/' component={ AgoraContainer } />
        </Switch>
      </div>
    );
  }
}

export default App;
