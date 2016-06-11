//add axios to package.json

import axios from 'axios';

export const POST_PROFILE = 'POST_PROFILE'

export function postProfile (profile) {
 const url = `/post_profile`;
  
const postRequest = axios.post(url, profile);

  return {
    type: POST_PROFILE,
    payload: postRequest
  }
}