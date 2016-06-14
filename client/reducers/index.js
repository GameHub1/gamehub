import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import JWT from './jwt_reducer'

const reducers = {

    form: formReducer,
    JWT: JWT

}

const reducer = combineReducers(reducers);

const storeHolder = createStore(reducer);

export default storeHolder;
