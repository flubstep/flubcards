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

  emit(action) {
    console.log("Emitting " + action.type, action)
    let reducer = actions[action.type]
    if (reducer) {
      this.ref.transaction(reducer)
    } else {
      console.error("Invalid action type: " + action.type)
    }
  }
}

GameState.subscribeRoomList = (callback) => {
  firebase.database().on('value', (store) => {
    let value = store.val()
    let rooms = values(value)
    callback(rooms)
  })
}

export default GameState;
