import React, {Component} from 'react';
import axios from 'axios';

export default class Auth0Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idToken: '',
      accessToken: '',
      name: '',
      email: ''
    };
    this.showLock = this.showLock.bind(this);
    this.logOut = this.logOut.bind(this);
    this.AUTHO_CLIENTID = 'LubDWPneUGD6bFqQbGEfnbMwJtVUHe3P';
    this.AUTHO_DOMAIN = 'g1na1011.auth0.com';
  }

  componentWillMount() {
    this.lock = new Auth0Lock(this.AUTHO_CLIENTID, this.AUTHO_DOMAIN);
    this.setState({idToken: this.getIdToken(), accessToken: this.getAccessToken()});
  }

  getInfo() {
    let that = this;
    axios.get('https://g1na1011.auth0.com/userinfo', {
        headers: {
          Authorization: 'Bearer ' + that.state.accessToken
        }
      })
      .then((response) => {
        console.log(response);

        that.setState({
          name: response.data.name,
          email: response.data.email
        });
      })
      .catch((response) => {
        console.log('Error: ', response);
      });
  }

  addNewUser() {
    let newUser = {
      name: this.state.name,
      email: this.state.email
    }

    axios.post('/signup', newUser)
      .then((response) => {
        console.log("Inside addNewUser: ", response);
      })
      .catch((response) => {
        console.log('Error: ', response);
      });
  }

  getAccessToken() {
    let authHash = this.lock.parseHash(window.location.hash);
    let accessToken;

    if (authHash) {
      if (authHash.access_token) {
        accessToken = authHash.access_token;
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
        // console.log('hash', authHash.access_token);
        // accessToken = authHash.access_token;

        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  }

  showLock() {
    // Show the Auth0Lock widget
    this.lock.show();
    // axios.get(`https://g1na1011.auth0.com/userinfo/?access_token=${this.state.idToken}`)
  }

  stateReset() {
    this.setState({
      idToken: '',
      accessToken: '',
      name: '',
      email: ''
    });

    window.location.href = window.location.href.split('#')[0];
  }

  logOut() {
    // Redirect to the home route after logout
    localStorage.removeItem('id_token');

    console.log('Before logout:', this.state);
    this.stateReset();

  }

  checkState() {
    if (!this.state.name && !this.state.email) {
      this.getInfo();
      this.addNewUser();
    }
  }

  render() {
    if (this.state.idToken) {
      this.checkState();
      return (
        <div>
          <button onClick={this.logOut}>LOG OUT HERE</button>
        </div>
      );
    } else {
      return (
        <div className="login-box">
          <a onClick={this.showLock}>Sign In</a>
        </div>
      );
    }
  }
}
