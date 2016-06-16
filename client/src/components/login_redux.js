import React, {Component} from 'react';
import axios from 'axios';
import { authFunc, resetAuth } from "../actions/index.js";
import {connect} from 'react-redux';

export class ReduxLogin extends Component {

  constructor(props){
    super(props);
    this.state = {};
    this.showLock = this.showLock.bind(this);
    this.logOut = this.logOut.bind(this);
    this.logState = this.logState.bind(this);
    this.AUTHO_CLIENTID = 'LubDWPneUGD6bFqQbGEfnbMwJtVUHe3P';
    this.AUTHO_DOMAIN = 'g1na1011.auth0.com';
  }

  componentWillMount() {
    this.lock = new Auth0Lock(this.AUTHO_CLIENTID, this.AUTHO_DOMAIN);
    this.checkState();
    // this.props.authFunc({idToken: this.getIdToken(), accessToken: this.getAccessToken()});
  }

  getAccessToken() {
    let authHash = this.lock.parseHash(window.location.hash);
    let accessToken;

    if (authHash) {
      if (authHash.access_token) {
        accessToken = authHash.access_token;;
        localStorage.setItem('access_token', authHash.access_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }

    return accessToken;
  }

  getIdToken() {
    // First, check if there is already a JWT in local storage
    let idToken = localStorage.getItem('id_token');
    let authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  }


  checkState() {
    if ((!this.props.authData.name || !this.props.authData.email) && window.location.hash.length) {
      this.getInfo();
    }
  }

  getInfo() {
    let authHash = this.lock.parseHash(window.location.hash);
    axios.get('https://g1na1011.auth0.com/userinfo', {
        headers: {
          Authorization: 'Bearer ' + authHash.access_token
        }
      })
      .then((response) => {
        this.props.authFunc({
          idToken: this.getIdToken(),
          accessToken: this.getAccessToken(),
          name: response.data.name,
          email: response.data.email
        });
        return response;
      })
      .then((response) => {
        this.addNewUser(response);
      })
      .catch((response) => {
        console.log('Error: ', response);
      });
  }

  addNewUser(response) {
    let newUser = {
      name: this.props.authData.name,
      email: this.props.authData.email,
      pic_path: response.data.picture_large
    }
    console.log('newuser: ', newUser)
    axios.post('/signup', newUser)
      .then((response) => {
        console.log("Inside addNewUser SUCCESSS: ", response);
      })
      .catch((response) => {
        console.log('Error: ', response);
      });
  }

  logOut() {
    // Redirect to the home route after logout
    localStorage.removeItem('id_token');
    resetAuth();
    window.location.href = window.location.href.split('#')[0];
  }

  showLock() {
    this.lock.show();
  }

  logState() {
    console.log("AuthData:", this.props.authData);
    console.log("State", this.state);
  }

  render() {
    console.log("Localstoraage.idTOken", this.props.authData.name);
    if (this.props.authData.name) {
      return (
        <div>
          <button onClick={this.logOut}>LOG OUT HERE</button>
        </div>
      );
    } else {
      return (
        <div className="login-box">
          <button onClick={this.showLock}>LOG IN</button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    authData: state.authData
  };
}

export default connect(mapStateToProps, {
  authFunc
})(ReduxLogin)
