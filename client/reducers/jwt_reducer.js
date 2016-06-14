// import action key(AUTHENTICATION)
import {AUTHENTICATION} from '../actions/index.js';

export default function (state=[], action) {
  switch(action.type) {
    case AUTHENTICATION:
      return [action.payload.data, ...state];
  }
  return state;
}
