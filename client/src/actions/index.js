//add axios to package.json

import axios from 'axios';

export const POST_PROFILE = 'POST_PROFILE';
export const AUTHENTICATION = 'AUTHENTICATION';
export const LOG_OUT = 'LOG_OUT';
export const CREATE_GAME = 'CREATE_GAME';
export const CREATE_FAVMEDIA = 'CREATE_FAVMEDIA';
// gina wrote this...
export const FETCH_USERS = 'FETCH_USERS';

export function postProfile (profile) {
  const url = `/post_profile`;
  const postRequest = axios.post(url, profile);

  return {
    type: POST_PROFILE,
    payload: profile
  };
}

export function authFunc (authData) {
  return {
    type: AUTHENTICATION,
    payload: authData
  };
}

export function resetAuth () {
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

export function createFavMedia (props) {
  const request = axios.post('/favmedia', props);
  console.log('in the action', props);
  
  return {
    type: CREATE_FAVMEDIA,
    payload: props
  };
}

//GINA WROTE THIS
export function fetchUsers(props) {
  // this request returns a promise cause of axios
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