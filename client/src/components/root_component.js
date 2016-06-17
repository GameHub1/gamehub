import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReduxLogin from './login_redux';
import SearchBar from '../containers/search_bar';
// import SearchedUsersList from '../containers/searched_users_list';
import Logout from '../components/logout';

export default class RootComponent extends Component {
  render() {
    console.log('root', Array.isArray(this.props.authData));
    if (!Array.isArray(this.props.authData)) {
      return (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <span className="navbar-brand">GameHub</span>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <SearchBar />
            </div>
            <Logout />
          </div>
        </nav>
      );
    } else {
      return (
        <div className="mario" background={require(__dirname + "/../../images/mario.jpg")}>
          <h1 id="headerTitle">GameHub</h1>
          <h2 id="headerSub">Come join the dark side...</h2>
          <br />
          <ReduxLogin />
        </div>
      );
    }
  }
}

function mapStateToProps({authData}) {
  return {authData};
}

export default connect(mapStateToProps)(RootComponent);