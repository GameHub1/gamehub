import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ReduxLogin from './login_redux';
import SearchBar from '../containers/search_bar';
import Logout from '../components/logout';
import {browserHistory} from 'react-router';
import {showFriends, showFollowers, postProfile, showGames, createFavMedia} from '../actions/index';
import axios from 'axios';

export default class RootComponent extends Component {
  constructor(props) {
    super(props);

    this.goToHome = this.goToHome.bind(this);
    this.goToMessage = this.goToMessage.bind(this);
  }

  goToHome() {
    const userEmail = this.props.authData.email
    axios.post('/get_user_info',{email: userEmail})
      .then((response) => {
        browserHistory.push(`/profile/${userEmail}`);
        let prop = {
          name: response.data.found.fullname,
          location: response.data.found.location,
          bio: response.data.found.bio,
          email: userEmail,
          pic_path: response.data.found.pic_path
        };
        this.props.showFriends([]);
        this.props.showFollowers([]);
        this.props.postProfile(prop);
        this.props.showGames({email: userEmail});
        this.props.createFavMedia([null, userEmail]);

        let URL_array = window.location.pathname.split('/profile/');
        axios.post('/get_friend_info',{friend1: this.props.authData.email, friend2: URL_array[1]})
          .then((response) => {
            if (this.props.authData.email !== this.props.profile.email) {
              if(response.data.status == "Found") {
                document.getElementById("followBtn").style.background='#5CB85C';
                document.getElementById("followBtn").firstChild.data='following';
              }
              else {
                document.getElementById("followBtn").style.background='#d3d3d3';
                document.getElementById("followBtn").firstChild.data='follow';
              }
            }
          });
      });
  }

  goToMessage() {
    browserHistory.push(`message/${this.props.authData.email}`);
  }

  render() {
    if (!Array.isArray(this.props.authData)) {
      return (
        <div>
          <nav className="navbar-inverse navbar-fixed-top">
            <div className="container">
              <div className="nav navbar-nav navbar-left navbar-header" id="gamehub-logo">
                <span id="navHeader" onClick={this.goToHome}>GameHub</span>
              </div>
              <div className="navbar">
                <div className="nav navbar-nav navbar-left">
                  <SearchBar />
                </div>
                <div lassName="nav navbar-nav navbar-right">
                  <button className="btn btn-default navbar-btn"onClick={this.goToMessage}>Messages</button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
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

function mapStateToProps({authData, profile}) {
  return {authData, profile};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({postProfile, showFriends, showFollowers, showGames, createFavMedia}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);
