import {FIND_GAMES} from '../actions/index';

export default function (state=[], action) {
  switch(action.type) {
    case FIND_GAMES:
      return action.payload.data;
    default: 
      return state;
  }
}