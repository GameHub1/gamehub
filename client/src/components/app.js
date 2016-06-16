import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {authentication} from '../actions/index';
import ReduxLogin from './login_redux';
//gina wrote this
import SearchBar from '../containers/search_bar';
import SearchedUsersList from '../containers/searched_users_list';

export default class App extends Component {
  render() {
    return (
      <div id="mario" background={require(__dirname + "/../../images/mario.jpg")}>
        <h1 id="headerTitle">GameHub</h1>
        <h2 id="headerSub">Come join the dark side...</h2>
        
        <ReduxLogin />
        <Link to="/profile_setup"> Go to profile setup </Link>
        <SearchBar />
        <SearchedUsersList />
      </div>

    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({authentication: authentication}, dispatch)
}