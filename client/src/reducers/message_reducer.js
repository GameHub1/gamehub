
import {GET_MESSAGES} from '../actions/index'

export default function (state=[], action) {
  switch(action.type) {
    case GET_MESSAGES:
      return action.payload;
    default:
      return state;
  } 

}
