import React, {Component} from 'react';
import axios from 'axios';
import {authFunc, resetAuth} from "../actions/index";
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

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
    console.log(response);
    let pic = response.data.picture_large || response.data.picture
    let newUser = {
      name: this.props.authData.name,
      email: this.props.authData.email,
      pic_path: pic
    }
    console.log('newuser: ', newUser)
    axios.post('/signup', newUser)
      .then((response) => {

        // set routing based on result of routeProp;
        console.log("this is the route prop: ", response)
        if (response.data.routeProp === 'found') {
            browserHistory.push(`/profile/${this.props.authData.name}`);
        }
        if (response.data.routeProp === 'not found') {
            browserHistory.push('/profile_setup');
        }
      })
      .catch((response) => {
        console.log('Error: ', response);
      });
  }

  logOut() {
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
          <button type="button" className="btn btn-secondary" onClick={this.logOut}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div>
          <button type="button" className="btn btn-secondary" onClick={this.showLock}>Log In / Sign Up</button>
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

export default connect(mapStateToProps, {authFunc})(ReduxLogin);
