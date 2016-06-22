import {POST_PROFILE, RENDER_PROFILE} from '../actions/index.js';

export default function (state=[], action) {
  switch(action.type) {
    case POST_PROFILE:
      return Object.assign({}, state, action.payload);
    case RENDER_PROFILE:
      return Object.assign({}, action.payload);
    default: 
      return state;
  }
}