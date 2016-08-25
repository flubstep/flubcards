import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import './App.css';

import RoomChooseScreen from './screens/RoomChooseScreen';
import RoomScreen from './screens/RoomScreen';
import DemoScreen from './screens/DemoScreen';

class App extends React.Component {

  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/" component={RoomChooseScreen} />
        <Route path="/demo" component={DemoScreen} />
        <Route path="/:room" component={RoomScreen} />
      </Router>
    );
  }
}

export default App;
