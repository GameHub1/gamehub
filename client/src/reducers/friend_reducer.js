import {FIND_FRIENDS} from '../actions/index';

export default function (state=[], action) {
  switch(action.type) {
    case FIND_FRIENDS:
     console.log('inside reducer switch');
      return action.payload;
    default:
      return state;
  }
}
