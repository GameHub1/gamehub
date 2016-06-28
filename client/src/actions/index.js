//add axios to package.json

import axios from 'axios';

export const POST_PROFILE = 'POST_PROFILE';
export const AUTHENTICATION = 'AUTHENTICATION';
export const LOG_OUT = 'LOG_OUT';
export const CREATE_GAME = 'CREATE_GAME';
export const CREATE_FAVMEDIA = 'CREATE_FAVMEDIA';
export const FETCH_ALL_FAVMEDIA = 'FETCH_ALL_FAVMEDIA';
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_GAMES = 'FETCH_GAMES';
export const DELETE_GAME = 'DELETE_GAME';
export const FIND_FRIENDS = 'FIND_FRIENDS';
export const RENDER_PROFILE = 'RENDER_PROFILE';
export const FIND_GAME_FANS = 'FIND_GAME_FANS';
export const SELECT_FRIEND = 'SELECT_FRIEND';
export const GET_MESSAGES = 'GET_MESSAGES';
export const FIND_GAMES = 'FIND_GAMES';

//this.props.params.id
//^ user's email

//call in componentWillMount
//call in changeUsers in friendsList
//call in changeUsers in serach bar

//link up in mapDispatchToProps


export function showGameFans(props) {
  return {
    type: FIND_GAME_FANS,
    payload: props
  };
}

export function getMessages(emails) {
  const request = axios.post('/get_messages', emails);
  return {
    type: GET_MESSAGES,
    payload: request
  }

}

export function showGames(props) {
  const request = axios.post('/fetch_games', props);
  return {
    type: FETCH_GAMES,
    payload: request
  };
}

export function selectFriend(data) {
  return {
    type: SELECT_FRIEND,
    payload: data
  };
}

export function showFriends(data) {
  return {
    type: FIND_FRIENDS,
    payload: data
  };
}

export function postProfile(profile) {
  const url = `/post_profile`;
  const postRequest = axios.post(url, profile);

  return {
    type: POST_PROFILE,
    payload: profile
  };
}

export function renderProfileState(profile) {

  return {
    type: RENDER_PROFILE,
    payload: profile
  };
}

export function authFunc(authData) {
  return {
    type: AUTHENTICATION,
    payload: authData
  };
}

export function resetAuth() {
  return {
    type: LOG_OUT,
    payload: undefined
  };
}

export function createGame(props) {
  const request = axios.post('/games', props);
  return {
    type: CREATE_GAME,
    payload: props
  };
}

export function deleteGame(props) {
  const request = axios.post('/delete_game', props);
  return {
    type: DELETE_GAME,
    payload: props
  };
}

export function createFavMedia(props) {
  const request = axios.post('/favmedia', props);

  return {
    type: CREATE_FAVMEDIA,
    payload: request
  };
}

export function fetchAllMedia(props) {
  return {
    type: FETCH_ALL_FAVMEDIA,
    payload: request
  }
}

export function fetchUsers(props) {
  const request = axios.post('/get_users', props);
  return {
    type: FETCH_USERS,
    // payload is an optional property that contains data that describes a particular action
    // redux-promise (middleware) will resolve the request promise for us so we will get the resolved data as the payload instead
    // redux-promise will ask if the payload is a promise or not
      // if so, it will stop the action, and it will create a new action and send it to the reducers ONLY when promise resolves
    payload: request
  };
}

export function findGames(props) {
  const request = axios.post('/get_games', props);
  return {
    type: FIND_GAMES,
    payload: request
  };
}
