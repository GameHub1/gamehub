import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, browserHistory} from 'react-router';
import routes, {createStoreMiddleware} from './routes';
import storeHolder from './src/reducers/index';

require(__dirname + "/css/style.css");

ReactDOM.render(
  <Provider store={storeHolder}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app'));
