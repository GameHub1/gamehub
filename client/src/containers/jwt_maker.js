import jwt from 'jwt-simple';

export function makeJwt(payload, secret) {
  return jwt.encode(payload, secret);
}

export function decodeJwt(token, secret) {
  return jwt.decode(token, secret);
}
