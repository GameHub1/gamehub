import {CREATE_FAVMEDIA} from '../actions/index';

export default function (state=[], action) {
  switch(action.type) {
    case CREATE_FAVMEDIA:
      return action.payload.data;
    default: 
      return state;
  }
}