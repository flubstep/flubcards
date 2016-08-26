import React from 'react';

import UserName from '../components/UserName';
import BlackCard from '../components/BlackCard';

import './RoomScreen.css';

class RoomScreen extends React.Component {

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

export default RoomScreen;
