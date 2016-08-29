/* globals firebase */

import actions from './actions';

class GameState {

  constructor(roomId) {
    this.ref = firebase.database().ref(roomId);
    this.ref.transaction((state) => {
      console.log(state);
      if (!state) {
        return actions.INIT_GAME();
      } else {
        return state;
      }
    });
  }

  subscribe(callback) {
    this.ref.on('value', (store) => {
      callback(store.val());
    });
  }

  apply(actionType, action) {
    let reducer = actions[actionType];
    if (reducer) {
      this.ref.transaction(reducer)
    } else {
      console.error("Invalid action type: " + actionType);
    }
  }
}

GameState.instances = {};

GameState.create = (roomId) => {
  if (!GameState.instances[roomId]) {
    GameState.instances[roomId] = new GameState(roomId);
  }
  return GameState.instances[roomId];
}

export default GameState;
