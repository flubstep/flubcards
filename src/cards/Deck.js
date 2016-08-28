import { shuffle } from 'lodash';

class Deck {

  constructor(cards) {
    this.cards = shuffle(cards);
    this.discard = [];
  }

  draw() {
    if (this.cards.length === 0) {
      this.cards = shuffle(this.discard);
      this.discard = [];
    }
    let drawn = this.cards.shift();
    // Just assume it's gonna get discarded at
    // some point.
    this.discard.push(drawn);
    return drawn;
  }
}

export default Deck;