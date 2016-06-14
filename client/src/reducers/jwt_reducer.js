// import action key(AUTHENTICATION)
import {AUTHENTICATION, LOG_OUT} from '../actions/index.js';

export default function (state=[], action) {
  switch(action.type) {
    case AUTHENTICATION:
      return action.payload
    case LOG_OUT:
      return [];
    default:
      return state
  }
}
