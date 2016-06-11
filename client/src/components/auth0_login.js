import React, {Component} from 'react';

export default class Auth0Login extends Component {
  constructor(props) {
    super(props);

    this.state = {idToken: ''};
    this.showLock = this.showLock.bind(this);
    this.logOut = this.logOut.bind(this);
    this.AUTHO_CLIENTID = 'LubDWPneUGD6bFqQbGEfnbMwJtVUHe3P';
    this.AUTHO_DOMAIN = 'g1na1011.auth0.com';
  }

  componentWillMount() {
    this.lock = new Auth0Lock(this.AUTHO_CLIENTID, this.AUTHO_DOMAIN);
    this.setState({idToken: this.getIdToken()});
  }

  getIdToken() {
    // First, check if there is already a JWT in local storage
    let idToken = localStorage.getItem('id_token');
    let authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
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
  }

  stateReset() {
    this.setState({idToken: ''});
  }

  logOut() {
    // Redirect to the home route after logout
    let that = this;
    localStorage.removeItem('id_token');
    this.stateReset();
    setTimeout(function() {
      console.log('logged out', that.state);
    }, 600);

  }

  render() {
    if (this.state.idToken) {
      console.log(this.state.idToken);
      return (
        <div>
          <button onClick={this.logOut}>LOGGED OUT HERE</button>
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

