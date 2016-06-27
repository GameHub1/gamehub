import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import GameList from '../components/games';
import FavMedia from '../components/favMedia';
import AllFavMedia from '../components/allFavMedia';
import FriendList from './friend_list';
import AddGames from '../components/add_games';
import {showFriends, showGames, postProfile, renderProfileState} from '../actions/index';
import {browserHistory} from 'react-router';

export class Profile extends Component {
  componentWillMount() {
    axios.post('/get_user_info',{email: this.props.params.id})
      .then(response => {
        let prop = {
          id: response.data.found.id,
          name: response.data.found.fullname,
          location: response.data.found.location,
          bio: response.data.found.bio,
          email: this.props.params.id,
          pic_path: response.data.found.pic_path
        };
        this.props.postProfile(prop);
        this.props.showGames({email: this.props.params.id});
      });
    let URL_array = window.location.pathname.split('/profile/');

    axios.post('/get_friend_info',{friend1: this.props.authData.email, friend2: URL_array[1]})
      .then(response => {
        console.log("FRIEND INFO RESPONSE: ", response);
        if (this.props.authData.email !== this.props.profile.email) {
          if(response.data.status === "Found") {
            document.getElementById("followBtn").style.background='#556B2F';
            document.getElementById("followBtn").firstChild.data='following';
          } else {
            document.getElementById("followBtn").style.background='#d3d3d3';
            document.getElementById("followBtn").firstChild.data='follow';
          }
        }
      });
  }

   sendToProfileAction() {
      axios.post('/get_user_info',{email: this.props.params.id})
      .then(response => {
        let prop = {
          id: response.data.found.id,
          name: response.data.found.fullname,
          location: response.data.found.location,
          bio: response.data.found.bio,
          email: this.props.params.id,
          pic_path: response.data.found.pic_path
        };
        this.props.renderProfileState(prop);
        this.props.showFriends([]);
        this.props.showGames({email: this.props.params.id});
        let URL_array = window.location.pathname.split('/profile/');
        axios.post('/get_friend_info',{friend1: this.props.authData.email, friend2: URL_array[1]})
        .then(response => {
          console.log("FRIEND INFO RESPONSE: ", response);
          if (this.props.authData.email !== this.props.profile.email) {
            if(response.data.status === "Found") {
              document.getElementById("followBtn").style.background='#556B2F';
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

   findFriends() {
    let URL_array = window.location.pathname.split('/profile/');
     axios.post('/show_friends', {email: URL_array[1]})
       .then(response => {
         let friendArr = response.data.data;
         this.props.showFriends(friendArr);
         friendArr.forEach(friend => {
           console.log(friend.name);
         });
       })
       .catch(response => {
         console.log('Error: ', response);
       });
   }

  addFriend() {
    let URL_array = window.location.pathname.split('/profile/');
    axios.post('/add_friend', {friend1: this.props.authData.email, friend2: URL_array[1]})
      .then(response => {
        if (this.props.authData.email !== this.props.profile.email) {
          if (response.data.action === "removed") {
            document.getElementById("followBtn").style.background='#d3d3d3';
            document.getElementById("followBtn").firstChild.data='follow';
          } else {
            document.getElementById("followBtn").style.background='#556B2F';
            document.getElementById("followBtn").firstChild.data='following';
          }
        }
      });
  }

  editProfile() {
    browserHistory.push('/profile_setup');
  }

  render() {
    $(window).on('popstate', function (e) {
      this.sendToProfileAction();
    }.bind(this));

    if (this.props.authData.email === this.props.profile.email) {
      return (
        <div className="container">
          <div className="col-md-4 profile-left" id="user_friends">
            <img className="img-responsive img-rounded" src={this.props.profile.pic_path}/>
            
            <div className="user-info">
              <h1 className="user-name">{this.props.profile.name}</h1>
              <h4 className="location">{this.props.profile.location || "San Francisco, CA"}</h4>
              
              <p>{this.props.profile.bio || "Hi, I haven\'t filled out my bio yet!"}</p>
              <div>
                <button id="editProfileBtn" className="btn btn-secondary" onClick={this.editProfile.bind(this)}>Edit Profile</button>
              </div>

              <div id="friends-component">
                <a className="all-friends" onClick={this.findFriends.bind(this)}>See who I am following!</a>
                <FriendList />
              </div>
            </div>
          </div>
          <div className="col-md-1">
            
          </div> 
          <div className="col-md-7 profile-right">
            <div>
              <h3 id="favGameHeader">Favorite Games</h3>
              <GameList />
              <AddGames />
              <br/><br/>
              <h3 id="mediaHeader">Gameplays</h3>
              <AllFavMedia />
              <FavMedia />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="col-md-4 profile-left" id="user_friends">
            <img className="img-responsive img-rounded" src={this.props.profile.pic_path}/>
              
            <div className="user-info">
              <h1 className="user-name">{this.props.profile.name}</h1>
              <h4 className="location">{this.props.profile.location || "San Francisco, CA"}</h4>
              
              <p>{this.props.profile.bio || "Hi, I haven\'t filled out my bio yet!"}</p>
              <div>
                <button id="followBtn" className="btn btn-secondary" onClick={this.addFriend.bind(this)}> Follow </button>
              </div>

              <div id="friends-component">
                <a className="all-friends" onClick={this.findFriends.bind(this)}>See who I am following!</a>
                <FriendList />
              </div>
            </div>
          </div>
          <div className="col-md-1">
            
          </div>
          <div className="col-md-7 profile-right">
            <div>
              <h3 id="favGameHeader">Favorite Games</h3>
              <GameList />
              <br/><br/>
              <h3 id="mediaHeader">Gameplays</h3>
              <AllFavMedia />
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({postProfile, showFriends, showGames, renderProfileState}, dispatch);
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    authData: state.authData,
    form: state.form,
    games: state.games,
    media: state.media
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
