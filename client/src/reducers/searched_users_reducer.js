import {FETCH_USERS} from '../actions/index';

export default function (state=[], action) {
  switch(action.type) {
    case FETCH_USERS:
      let searched_users = action.payload;
      return searched_users;
    default: 
      return state;
  }
}