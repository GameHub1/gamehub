import {POST_PROFILE} from '../actions/index.js';

export default function (state=[], action) {
  switch(action.type) {
    case POST_PROFILE:
      return Object.assign({}, state, action.payload);
    default: 
      return state;
  }
}