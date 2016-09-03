import React from 'react'
import { browserHistory } from 'react-router'
import { random, range } from 'lodash'

import GameState from '../game/GameState'
import LoadingIndicator from '../components/LoadingIndicator'
import RoomPreview from '../components/RoomPreview'

class RoomChooseScreen extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      rooms: [],
      roomsLoaded: false
    }
    this.onClick = (e) => this._onClick(e)
  }

  componentDidMount() {
    GameState.subscribeRoomList(() => {
      this.setState({ rooms: rooms, roomsLoaded: true })
    })
  }

  randomId(length=8) {
    let letters = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let rand = () => letters[random(0, letters.length-1)]
    let chars = range(length).map(rand)
    return chars.join('')
  }

  _onClick() {
    let room = this.randomId()
    browserHistory.push('/cards/' + room)
  }

  render() {
    return (
      <section>
        {
          this.state.roomsLoaded ? (
            <section>
              <h1>Join a room</h1>
              {
                this.state.rooms.map((room) => (<RoomPreview room={room} />))
              }
            </section>
          ) : (<LoadingIndicator />)
        }
        <button onClick={this.onClick}>
          Create a new room
        </button>
      </section>
    )
  }
}

export default RoomChooseScreen;