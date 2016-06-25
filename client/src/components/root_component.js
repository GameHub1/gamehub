import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReduxLogin from './login_redux';
import SearchBar from '../containers/search_bar';
import Logout from '../components/logout';

export default class RootComponent extends Component {
  render() {
    if (!Array.isArray(this.props.authData)) {
      return (  
        <div>
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid navbar">
              <div className="navbar-header">
                <span id="navHeader">GameHub</span>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <SearchBar />
                <div className="logoutButton">
                  <Logout />
                </div>
              </div>
            </div>
          </nav>
          {this.props.children}
        </div>
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