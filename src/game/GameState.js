/* globals firebase */

import { values } from 'lodash'
import actions from './actions'

class GameState {

  constructor(roomId) {
    this.ref = firebase.database().ref(roomId)
    this.ref.transaction((state) => {
      console.log(state)
      if (!state) {
        return actions.INIT_GAME()
      } else {
        return state
      }
    })
  }

  subscribe(callback) {
    this.ref.on('value', (store) => {
      callback(store.val())
    });
  }

  subscribeRoomList(callback) {
    firebase.database().ref('/').on('value', (store) => {
      let value = store.val()
      let rooms = values(value) || []
      rooms = rooms.filter((r) => r.players && r.players.length > 0)
      callback(rooms)
    })
  }

  emit(action) {
    console.log("Emitting " + action.type, action)
    let reducer = actions[action.type]
    if (reducer) {
      this.ref.transaction((state) => reducer(state, action))
    } else {
      console.error("Invalid action type: " + action.type)
    }
  }
}

export default GameState;
