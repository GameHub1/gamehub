import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authData from './jwt_reducer'
import createLogger from 'redux-logger';
import profile from './profile_reducer';
import games from './games_reducer';
import media from './favmedia_reducer.js';
import promise from 'redux-promise'

const logger = createLogger();

const reducers = {
  form: formReducer,
  authData: authData,
  profile: profile,
  games: games,
  media: media


}

const reducer = combineReducers(reducers);

const storeHolder = createStore(reducer, {}, applyMiddleware(logger, promise));

export default storeHolder;
