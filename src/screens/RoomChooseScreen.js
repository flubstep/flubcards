import React from 'react'
import { browserHistory } from 'react-router'
import { random, range } from 'lodash'

import GameState from '../game/GameState'
import UserInfo from '../game/UserInfo'
import LoadingIndicator from '../components/LoadingIndicator'
import RoomPreview from '../components/RoomPreview'
import AskNameScreen from './AskNameScreen'

class RoomChooseScreen extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      user: null,
      rooms: [],
      roomsLoaded: false
    }
    this.onClick = (e) => this._onClick(e)
  }

  componentDidMount() {
    GameState.subscribeRoomList((rooms) => {
      this.setState({ rooms: rooms, roomsLoaded: true })
    })
    UserInfo.subscribe((info) => {
      this.setState({ user: info })
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
    if (!this.state.user) {
      return (
        <AskNameScreen />
      )
    } else {
      return (
        <section className="screen flex-centered">
          {
            this.state.roomsLoaded ? (
              <section>
                <h1>Join a room</h1>
                {
                  this.state.rooms.map((room) => (
                    <RoomPreview key={room.id} room={room} />
                  ))
                }
                {
                  this.state.rooms.length === 0 ? (
                    <section>No rooms available :(</section>
                  ) : null
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
}

export default RoomChooseScreen;