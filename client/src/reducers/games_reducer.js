import {CREATE_GAME} from '../actions/index.js';

export default function (state=[], action) {
  switch(action.type) {
    case CREATE_GAME:
    console.log("Game reducer consoled")
     let game = [action.payload[0].gameTitle]
      return [state, ...game];
    default:
      return state;
  }
}
