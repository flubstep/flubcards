import React from 'react';
import { values } from 'lodash'

import UserName from '../components/UserName'

class GameLobbyScreen extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    let players = this.props.players || []
    return (
      <section className="screen flex-centered">
        <section>
          <h1>Our players so far</h1>
          {
            values(players).map((p) => (
              <section>{p.name}</section>
            ))
          }
        </section>
        <button onClick={this.props.onReady}>Get it started!</button>
      </section>
    );
  }
}

export default GameLobbyScreen;
