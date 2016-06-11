import React, {Component} from 'react';
import { connect } from 'react-redux';
import FbLogin from '../containers/fb_login';
// import Login from '../containers/login';
import Auth0 from './auth0_login';
import {Link} from 'react-router'

export default class App extends Component {

  render() {    
    return (
      <div>
        <h1>GameHub</h1>
        <h2>slogan...</h2>
        <FbLogin />
        {this.props.children}
        <Auth0 />
        <Link to="/profile_setup"> Go to profile setup </Link>
      </div> 
    );
  }
}