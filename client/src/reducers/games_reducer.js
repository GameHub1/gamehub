import {CREATE_GAME} from '../actions/index.js';
import {DELETE_GAME} from '../actions/index.js';
import {FETCH_GAMES} from '../actions/index.js';

export default function (state=[], action) {
  switch(action.type) {
    case CREATE_GAME:
      console.log("Game reducer consoled")
      let game = [action.payload[0].gameTitle];
      let state2 = state.slice();
      state2.push(game);
      return state2;
    case DELETE_GAME:
      let deletedGame = [action.payload[0].gameTitle];
      console.log("Deleting game: ", deletedGame);
      return state;
    case FETCH_GAMES:
      console.log("Fetching games: ", action.payload.data.data);
      return action.payload.data.data;
    default:
      return state;
  }
}
