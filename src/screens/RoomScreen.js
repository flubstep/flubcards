import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import UserName from '../components/UserName';
import BlackCard from '../components/BlackCard';

import './RoomScreen.css';

class RoomChooseScreen extends React.Component {

  render() {
    let blackCardText = "Donald Trump’s first act as president was to outlaw _________.";
    return (
      <section>
        <UserName>Albert</UserName>
        <BlackCard>{blackCardText}</BlackCard>
      </section>
    );
  }
}

export default RoomChooseScreen;
