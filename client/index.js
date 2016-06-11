

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk'
import App from './src/components/app';
import {Router, browserHistory} from 'react-router';
import routes, { createStoreMiddleware } from './routes';
// import LoginReducer from './src/reducers/login_reducer';

require(__dirname + "/css/style.css");

ReactDOM.render(
  <Provider store={createStoreMiddleware}>
    <Router history = {browserHistory} routes ={routes} />
  </Provider>,
  document.getElementById('app'));

