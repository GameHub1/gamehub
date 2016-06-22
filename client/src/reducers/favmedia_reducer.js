import {CREATE_FAVMEDIA} from '../actions/index';

export default function (state=[], action) {
  switch(action.type) {
    case CREATE_FAVMEDIA:

      let mediaURL = [action.payload.data];
      console.log('lalalla', action.payload);
      return [...mediaURL];
    default: 
      return state;
  }
}