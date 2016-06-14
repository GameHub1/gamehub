import React, {Component} from 'react';
import { connect } from 'react-redux';
import FbLogin from '../containers/fb_login';
// import Login from '../containers/login';
import Auth0 from './auth0_login';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {authentication} from '../actions/index';
import ReduxLogin from './login_redux';

export default class App extends Component {
  render() {
    return (
      <div background={require(__dirname + "/../../images/mario.jpg")}>
        <h1 id="headerTitle">GameHub</h1>
        <h2 id="headerSub">Come join the dark side...</h2>
        <FbLogin />
        {this.props.children}
        <ReduxLogin />
        <Link to="/profile_setup"> Go to profile setup </Link>
      </div> 
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({authentication: authentication}, dispatch)
}
