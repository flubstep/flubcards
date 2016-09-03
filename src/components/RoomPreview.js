import React from 'react';

import './RoomPreview.css';
import personSvg from '../static/ic_person_black_24px.svg';

class RoomPreview extends React.Component {

  render() {
    return (
      <section>
        <section>
          <section>Room Name TBA</section>
          {
            this.props.room.players.map((player) => (
              <section>{player}</section>
            ))
          }
        </section>
      </section>
    );
  }
}

export default RoomPreview;
