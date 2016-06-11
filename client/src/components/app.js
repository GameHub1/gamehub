import React, {Component} from 'react';
import { connect } from 'react-redux';
import FbLogin from '../containers/fb_login';
// import Login from '../containers/login';

export default class App extends Component {
  render() {    
    return (
      <div>
        <h1>GameHub</h1>
        <h2>slogan...</h2>
        <FbLogin />
        Test, 1,2
      {this.props.children}
      </div>

      
      
      
    );
  }
}