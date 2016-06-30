import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router, Route, Link, browserHistory } from 'react-router';
import {postProfile, showFriends, showFollowers, renderProfileState, showGames, createFavMedia, findGames, showGameFans} from '../actions/index';
import {bindActionCreators} from 'redux';
import axios from 'axios';

class SearchedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeProfile = this.changeProfile.bind(this);
  }

  changeProfile(email) {
    axios.post('/get_user_info',{email: email})
      .then(response => {

        browserHistory.push(`/profile/${email}`);

        let prop = {
          name: response.data.found.fullname,
          location: response.data.found.location,
          bio: response.data.found.bio,
          email: email,
          pic_path: response.data.found.pic_path
        };

        this.props.showFollowers([]);
        this.props.showFriends([]);
        this.props.renderProfileState(prop);
        this.props.showGames({email: email});
        this.props.createFavMedia([null, email]);

        let URL_array = window.location.pathname.split('/profile/');
        axios.post('/get_friend_info',{friend1: this.props.authData.email, friend2: URL_array[1]})
          .then(response => {
            if(response.data.status == "Found") {
              document.getElementById("followBtn").style.background='#556B2F';
              document.getElementById("followBtn").firstChild.data='following';
            }
            else {
              document.getElementById("followBtn").style.background='#d3d3d3';
              document.getElementById("followBtn").firstChild.data='follow';
            }
          });
    });

  }

  goToGamesPage(game) {
    browserHistory.push(`/game/${game}`);
    axios.post('/show_game_fans', {game: game})
      .then(response => {
        this.props.showGameFans(response.data.data);
      });
  }

  renderGames(GamesData) {
    let game = GamesData.name;
    let that = this;

    return (
      <tr id="searchedGamesRow" className="searchRowsGames" key={game} onClick={() => {that.goToGamesPage(game)}}>
        <td><i className="fa fa-gamepad" aria-hidden="true"></i></td>
        <td>{game}</td>
      </tr>
    );
  }

  renderUsers(userData) {
    const fullname = userData.fullname;
    const email = userData.email;
    let that = this;

    return (
      <tr id="searchedUsersRow" className="searchRows" key={email} onClick={() => {that.changeProfile(email)}}>
        <td><span className="glyphicon glyphicon-user"></span></td>
        <td>{fullname}</td>
        <td>{email}</td>
      </tr>
    );
  }

  render() {
    return (
      <table id="userList">
        <tbody>
          {this.props.searched_games.map(this.renderGames.bind(this))}
          {this.props.searched_users.map(this.renderUsers.bind(this))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    authData: state.authData,
    form: state.form,
    games: state.games,
    media: state.media,
    searched_users: state.searched_users,
    searched_games: state.searched_games
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({postProfile, showFriends, showFollowers, renderProfileState, showGames, createFavMedia, findGames, showGameFans}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedUsers);
