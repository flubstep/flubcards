import whitecards from '../cards/whitecards';
import blackcards from '../cards/blackcards';

import { deckCopy, deckDraw, deckInit } from '../cards/deckFunctions';
import { shuffle, range, every } from 'lodash';

function assign() {
  return Object.assign({}, ...arguments);
}

/*
  game: 'unstarted' | 'choosing' | 'judging' | 'winner'
  player: {
    id: string
    name: string
    hand: card list
    chosen: card
  }
*/

const initialState = () => (
  {
    game: 'unstarted',
    players: [],
    playerOrder: [],
    judge: 0,
    judgmentCandidate: null,
    blackCard: null,
    blackDeck: deckInit(blackcards),
    whiteDeck: deckInit(whitecards),
  }
)

const actions = {

  INIT_GAME: (state, action) => {
    return initialState();
  },

  // @param action.id
  // @param action.name
  ADD_PLAYER: (state, action) => {
    let whiteDeck = deckCopy(state.whiteDeck);
    let newHand = range(7).forEach(() => deckDraw(whiteDeck));
    let newPlayer = {
      id: action.id,
      name: action.name,
      hand: newHand,
      chosen: null
    }
    return assign(state, {
      whiteDeck: whiteDeck,
      players: state.players.concat([ newPlayer ])
    });
  },

  // @param action.player
  REMOVE_PLAYER: (state, action) => {
    return assign(state, {
      players: state.players.filter((p) => (p.id !== action.player.id))
    });
  },

  // @param action.player
  // @param action.card
  PLAYER_CHOOSE_CARD: (state, action) => {
    if (state.game !== 'choosing') {
      return state;
    }
    let players = state.players.map((player) => {
      if (player.id === action.player.id) {
        return assign(player, {
          chosen: action.card
        });
      } else {
        return player;
      }
    })
    return assign(state, {
      players
    });
  },

  START_JUDGMENT: (state, action) => {
    const isReady = (p) => (p.chosen || p.id === state.judge.id);
    const everyoneReady = every(state.players, isReady);
    if (state.game !== 'choosing' || !everyoneReady) {
      return state;
    }
    return assign(state, {
      game: 'judging',
      playerOrder: shuffle(range(state.players.length)),
      judgmentCandidate: null
    });
  },

  // action.card
  JUDGE_LOOK_AT_CARD: (state, action) => {
    if (state.game !== 'judging') {
      return state;
    }
    return assign(state, {
      judgmentCandidate: action.card
    });
  },

  // action.card
  JUDGE_CHOOSE_CARD: (state, action) => {
    if (state.game !== 'judging') {
      return state;
    }
    return assign(state, {
      game: 'winner',
      judgmentCandidate: action.card
    });
  },

  START_NEW_ROUND: (state, action) => {
    if (state.game !== 'winner' && state.game !== 'unstarted') {
      return state;
    }
    // Need to update the decks once we draw cards
    let whiteDeck = deckCopy(state.whiteDeck);
    let blackDeck = deckCopy(state.blackDeck);

    // Give new white cards to players
    let players = state.players.map((p) => {
      let hand = (c) => {
        if (c === p.chosen) {
          let newCard = deckDraw(whiteDeck);
          return newCard;
        } else {
          return c;
        }
      }
      return assign(p, {
        hand: hand,
        chosen: null,
      });
    });

    // Draw a new black card
    let blackCard = deckDraw(blackDeck);

    // Find the new judge
    let judge = (state.judge + 1) % state.players.length;

    return assign(state, {
      game: 'choosing',
      players: players,
      judge: judge,
      whiteDeck: whiteDeck,
      blackCard: blackCard,
      blackDeck: blackDeck
    });
  }
}

export default actions;