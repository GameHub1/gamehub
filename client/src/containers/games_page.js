import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {postProfile, showFriends, showGames, createFavMedia, showGameFans} from '../actions/index';
import axios from 'axios';
import {browserHistory} from 'react-router';

export class GamesPage extends Component {
  componentWillMount () {
    let URL_array = window.location.pathname.split('/game/');
    let game = URL_array[1].split('%20').join(' ');
    axios.post('/show_game_fans', {game: game})
      .then((response) => {
        console.log(response.data.data);
        this.props.showGameFans(response.data.data);
      });
    
  }

  changeProfile(email) {
    axios.post('/get_user_info',{email: email})
      .then((response) => {
        browserHistory.push(`/profile/${email}`);
        let prop = {
          name: response.data.found.fullname,
          location: response.data.found.location,
          bio: response.data.found.bio,
          email: email,
          pic_path: response.data.found.pic_path
        };
        this.props.showFriends([]);
        this.props.postProfile(prop);
        this.props.showGames({email: email});
        this.props.createFavMedia([null, email]);

        let URL_array = window.location.pathname.split('/profile/');
        axios.post('/get_friend_info',{friend1: this.props.authData.email, friend2: URL_array[1]})
          .then((response) => {
            console.log("FRIEND INFO RESPONSE: ", response);
            if(response.data.status == "Found") {
              document.getElementById("followBtn").style.background='#556B2F';
              document.getElementById("followBtn").firstChild.data='following!';
            }
            else {
              document.getElementById("followBtn").style.background='#d3d3d3';
              document.getElementById("followBtn").firstChild.data='follow';
            }
          });
      });
    }

  render () {
    let URL_array = window.location.pathname.split('/game/');
    let game = URL_array[1].split('%20').join(' ');
    console.log(this.props.gameFans);

    return(
      <div>
      {game}
        People that like this game:
        {this.props.gameFans.map(item => {
          return (
          <div key={item.name}>
          <span onClick={()=> {this.changeProfile(item.email)}} className="friend_pic">
          <img src={item.pic_path}/>
          </span>
          <span onClick={()=> {this.changeProfile(item.email)}}>
          {item.name}
          </span>
          </div>
          )
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friendList: state.friendList,
    authData: state.authData,
    gameFans: state.gameFans
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({postProfile, showFriends, showGames, createFavMedia, showGameFans}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesPage);
