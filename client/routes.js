import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ProfileForm from './src/containers/profile_form';
import App from './src/components/app';
import promise from 'redux-promise';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Profile from './src/containers/profile'

function tempReducer(initialAction, action) {
  return {lol: "hi"};
}

export const createStoreMiddleware = createStore(
  tempReducer,
  {lol: "ok"},
  applyMiddleware(promise));

export default (
  <Route path='/' component={App} >
    <Route path='profile_setup' component={ProfileForm}/>
    <Route path='profile' component = {Profile}/>
  </Route>
);