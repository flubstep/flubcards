import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import './App.css';

import RoomChooseScreen from './screens/RoomChooseScreen';
import RoomScreen from './screens/RoomScreen';

class App extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/cards" component={RoomChooseScreen} />
        <Route path="/cards/:room" component={RoomScreen} />
      </Router>
    );
  }
}

export default App;
