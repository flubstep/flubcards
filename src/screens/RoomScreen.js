import React from 'react'
import { range } from 'lodash'

import ChooseCardScreen from './ChooseCardScreen'
import GameLobbyScreen from './GameLobbyScreen'
import LoadingScreen from './LoadingScreen'

import GameState from '../game/GameState'
import UserInfo from '../game/UserInfo'
import Deck from '../cards/Deck'
import blackcards from '../cards/blackcards'
import whitecards from '../cards/whitecards'

import './RoomScreen.css'

const blackDeck = new Deck(blackcards)
const whiteDeck = new Deck(whitecards)

const blackCardText = blackDeck.draw()
const whiteCardTexts = range(7).map(() => whiteDeck.draw())

class RoomScreen extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {

    }
    this.room = new GameState(this.props.params.room)
    this.user = UserInfo.get()
    this.updateGameState = (gameState) => this.setState({ gameState })
    this.onGameStart = (e) => this._onGameStart(e)
  }

  componentDidMount() {
    this.room.subscribe(this.updateGameState)
    if (!this.user) {
      // todo: ???
    } else {
      this.room.emit({
        type: 'ADD_PLAYER',
        id: this.user.id,
        name: this.user.name
      })
    }
  }

  componentWillUnmount() {
    // this.room.unsubscribe(this.updateGameState)
  }

  _onGameStart() {
    this.room.emit({
      type: 'START_NEW_ROUND'
    })
  }

  renderInner() {
    let gs = this.state.gameState
    if (!gs) {
      return (
        <LoadingScreen
          />
      )
    } else if (gs.game === 'unstarted') {
      return (
        <GameLobbyScreen
          players={gs.players}
          onReady={() => this.onGameStart()}
          />
      )
    } else if (gs.game === 'choosing') {
      let player = gs.players[this.user.id]
      return (
        <ChooseCardScreen
          user={this.user}
          room={this.room}
          blackCard={gs.blackCard}
          player={player}
          />
      )
    } else {
      return (
        <section>Unknown Screen</section>
      )
    }
  }

  render() {
    return (
      <section className="screen">
        { this.renderInner() }
      </section>
    )
  }
}

export default RoomScreen
