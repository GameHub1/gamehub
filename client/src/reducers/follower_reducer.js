import {FIND_FOLLOWERS} from '../actions/index';

export default function (state=[], action) {
  switch(action.type) {
    case FIND_FOLLOWERS:
      return action.payload;
    default:
      return state;
  }
}