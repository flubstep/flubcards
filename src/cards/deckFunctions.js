import { shuffle } from 'lodash';

const deckInit = (cards) => {
  return [shuffle(cards), []]
}

const deckCopy = (deck) => {
  return [deck[0].slice(), deck[1].slice()]
}

// HACK: mutating function, oh well
const deckDraw = (deck) => {
  if (deck[0].length === 0) {
    deck[0] = shuffle(deck[1]);
    deck[1] = [];
  }
  let card = deck[0].shift();
  deck[1].push(card);
  return card;
}

export {
  deckInit,
  deckCopy,
  deckDraw
};