import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk'
import App from './src/components/app';
// import LoginReducer from './src/reducers/login_reducer';

ReactDOM.render(
  <App />,
  document.getElementById('app'));

