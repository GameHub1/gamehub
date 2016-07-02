import React, {Component} from 'react';
import axios from 'axios';
import {authFunc, resetAuth} from "../actions/index";
import {connect} from 'react-redux';

export class Logout extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    localStorage.removeItem('id_token');
    resetAuth();
    window.location.href = '/';
  }

  render() {
    return (
      <button type="button" className="btn btn-default navbar-btn" onClick={this.logOut}>Log Out</button>
    );
  }
}

function mapStateToProps(state) {
  return {
    authData: state.authData
  };
}

export default connect(mapStateToProps, {authFunc})(Logout);
