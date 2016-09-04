import whitecards from '../cards/whitecards'
import blackcards from '../cards/blackcards'

import { deckCopy, deckDraw, deckInit } from '../cards/deckFunctions'
import { shuffle, range, every, values } from 'lodash'

function assign() {
  return Object.assign({}, ...arguments)
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
    players: {},
    playerOrder: [],
    judge: 0,
    judgmentCandidate: null,
    blackCard: null,
    blackDeck: deckInit(blackcards),
    whiteDeck: deckInit(whitecards),
  }
)

const playerObject = (player) => {
  let ret = {}
  ret[player.id] = player
  return ret
}

const actions = {

  INIT_GAME: (state, action) => {
    return initialState()
  },

  // @param action.id
  // @param action.name
  ADD_PLAYER: (state, action) => {
    let whiteDeck = deckCopy(state.whiteDeck)
    let newHand = range(7).map(() => deckDraw(whiteDeck))
    let newPlayer = playerObject({
      id: action.id,
      name: action.name,
      hand: newHand,
      chosen: null
    })
    return assign(state, {
      whiteDeck: whiteDeck,
      players: assign(state.players, newPlayer)
    })
  },

  // @param action.player
  REMOVE_PLAYER: (state, action) => {
    return assign(state, {
      players: state.players.filter((p) => (p.id !== action.player.id))
    })
  },

  // @param action.player
  // @param action.card
  PLAYER_CHOOSE_CARD: (state, action) => {
    if (state.game !== 'choosing') {
      return state
    }
    let player = state.players[action.player.id]
    if (player) {
      let playerUpdate = assign(player, {
        chosen: action.card
      })
      let players = assign(state.players, playerObject(playerUpdate))
      return assign(state, { players })
    } else {
      console.warn("This player isn't even in the game")
      return state
    }
  },

  START_JUDGMENT: (state, action) => {
    const isReady = (p) => (p.chosen || p.id === state.judge.id)
    const everyoneReady = every(values(state.players), isReady)
    if (state.game !== 'choosing' || !everyoneReady) {
      return state
    }
    return assign(state, {
      game: 'judging',
      playerOrder: shuffle(range(state.players.length)),
      judgmentCandidate: null
    })
  },

  // action.card
  JUDGE_LOOK_AT_CARD: (state, action) => {
    if (state.game !== 'judging') {
      return state
    }
    return assign(state, {
      judgmentCandidate: action.card
    })
  },

  // action.card
  JUDGE_CHOOSE_CARD: (state, action) => {
    if (state.game !== 'judging') {
      return state
    }
    return assign(state, {
      game: 'winner',
      judgmentCandidate: action.card
    })
  },

  START_NEW_ROUND: (state, action) => {
    if (state.game !== 'winner' && state.game !== 'unstarted') {
      return state
    }
    // Need to update the decks once we draw cards
    let whiteDeck = deckCopy(state.whiteDeck)
    let blackDeck = deckCopy(state.blackDeck)

    // Give new white cards to players
    let players = {}
    values(state.players).forEach((p) => {
      // Remove the card they chose
      let checkCard = (c) => {
        if (c === p.chosen) {
          let newCard = deckDraw(whiteDeck)
          return newCard
        } else {
          return c
        }
      }
      players[p.id] = assign(p, {
        hand: p.hand.map(checkCard),
        chosen: null,
      })
    })

    // Draw a new black card
    let blackCard = deckDraw(blackDeck)

    // Find the new judge
    let judge = (state.judge + 1) % values(state.players).length

    let ret = assign(state, {
      game: 'choosing',
      players: players,
      judge: judge,
      whiteDeck: whiteDeck,
      blackCard: blackCard,
      blackDeck: blackDeck
    })
    console.log('returning', ret)
    return ret
  }
}

export default actions