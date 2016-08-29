import React from 'react';
import { range } from 'lodash';

import ChooseCardScreen from './ChooseCardScreen';
import GameLobbyScreen from './GameLobbyScreen';
import LoadingScreen from './LoadingScreen';

import GameState from '../game/GameState';
import Deck from '../cards/Deck';
import blackcards from '../cards/blackcards';
import whitecards from '../cards/whitecards';

import './RoomScreen.css';

const blackDeck = new Deck(blackcards);
const whiteDeck = new Deck(whitecards);

const blackCardText = blackDeck.draw();
const whiteCardTexts = range(7).map(() => whiteDeck.draw());

class RoomScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {

    }
    this.room = GameState.create(this.props.params.room);
    this.updateGameState = (gameState) => this.setState({ gameState });
  }

  componentDidMount() {
    this.room.subscribe(this.updateGameState);
  }

  renderInner() {
    let gs = this.state.gameState;
    if (!gs) {
      return (
        <LoadingScreen
          />
      );
    } else if (gs.game === 'unstarted') {
      return (
        <GameLobbyScreen
          players={gs.players}
          />
      );
    } else if (gs.game === 'choosing') {
      return (
        <ChooseCardScreen
          room={this.room}
          blackCard={gs.blackCard}
          hand={whiteCardTexts}
          />
      );
    } else {
      return (
        <section>Unknown Screen</section>
      );
    }
  }

  render() {
    return (
      <section className="screen">
        { this.renderInner() }
      </section>
    );
  }
}

export default RoomScreen;
