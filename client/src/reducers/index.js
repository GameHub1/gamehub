import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authData from './jwt_reducer'
import createLogger from 'redux-logger';
import profile from './profile_reducer';

const logger = createLogger();

const reducers = {
  form: formReducer,
  authData: authData,
  profile: profile
}

const reducer = combineReducers(reducers);

const storeHolder = createStore(reducer, {}, applyMiddleware(logger));

export default storeHolder;
