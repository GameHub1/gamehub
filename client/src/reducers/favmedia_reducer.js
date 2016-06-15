import {CREATE_FAVMEDIA} from '../actions/index';

export default function (state=[], action) {
  switch(action.type) {
    case CREATE_FAVMEDIA:

      let mediaURL = [action.payload[1].favMediaURL];
      return [state, ...mediaURL];
    default: 
      return state;
  }
}