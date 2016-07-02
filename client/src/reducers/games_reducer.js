import {CREATE_GAME} from '../actions/index.js';
import {FETCH_GAMES} from '../actions/index.js';

export default function (state=[], action) {
  switch(action.type) {
    case CREATE_GAME:
      let game = [action.payload[0].gameTitle];
      let state2 = state.slice();
      state2.push(game);
      return state2;
    case FETCH_GAMES:
      return action.payload.data.data;
    default:
      return state;
  }
}
