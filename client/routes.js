import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ProfileForm from './src/containers/profile_form';
import promise from 'redux-promise';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import Profile from './src/containers/profile';
import Root from './src/components/root_component';
import GamesPage from './src/containers/games_page';
import Message from './src/containers/message_page';

export const createStoreMiddleware = createStore(
  applyMiddleware(promise)
);

export default (
  <Route path='/' component={Root}>
    <Route path='profile_setup' component={ProfileForm}/>
    <Route path='/profile/:id' component={Profile}/>
    <Route path='/game/:id' component={GamesPage}/>
    <Route path ='/message/:id' component={Message}/>
  </Route>
);
