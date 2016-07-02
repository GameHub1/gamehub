import {FIND_GAME_FANS} from '../actions/index';

export default function (state=[], action) {
  switch(action.type) {
    case FIND_GAME_FANS:
      return action.payload;
    default:
      return state;
  }
}