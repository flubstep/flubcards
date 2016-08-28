import React from 'react';
import { range } from 'lodash';

import ChooseCardScreen from './ChooseCardScreen';
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
  }

  render() {
    return (
      <section className="screen">
        <ChooseCardScreen blackCard={blackCardText} hand={whiteCardTexts} />
      </section>
    );
  }
}

export default RoomScreen;
