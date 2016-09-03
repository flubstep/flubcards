import React from 'react';

import './RoomPreview.css';
import personSvg from '../static/ic_person_black_24px.svg';

class RoomPreview extends React.Component {

  render() {
    let players = this.props.room.players || []
    return (
      <section>
        <section>
          <section>Room: {this.props.room.id}</section>
          {
            players.map((player) => (
              <section key={player.id}>{player}</section>
            ))
          }
        </section>
      </section>
    );
  }
}

export default RoomPreview;
