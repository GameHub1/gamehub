import React, {Component, PropTyes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Games from '../components/games';
import FavMedia from '../components/favMedia';
import axios from 'axios';
import FriendList from './friend_list';
import {showFriends} from '../actions/index';
import {postProfile} from '../actions/index.js';
import {browserHistory} from 'react-router';

export class Profile extends Component {

  componentWillMount () {
    axios.post('/get_user_info',{email: this.props.authData.email})
      .then((response) => {
        console.log(response);
        let prop = {
          name: response.data.found.fullname,
          location: response.data.found.location,
          bio: response.data.found.bio,
          email: this.props.authData.email,
          pic_path: response.data.found.pic_path
        };
        this.props.postProfile(prop);
      });
    let URL_array = window.location.pathname.split('/profile/');
    axios.post('/get_friend_info',{friend1: this.props.authData.email, friend2: URL_array[1]})
      .then((response) => {
        console.log("FRIEND INFO RESPONSE: ", response);
        if(response) {
          document.getElementById("followBtn").style.background='#556B2F';
          document.getElementById("followBtn").firstChild.data='following';
        }
      })
  }

   getState () {
      console.log('This is media ', this.props.media);
      console.log('This is games ', this.props.games);
      console.log('THis is profile', this.props.profile);
   }

   findFriends() {
     axios.get('/get_friends', "test")
       .then((response) => {
         let friendArr = response.data.data;
         this.props.showFriends(friendArr);
         console.log("Inside findFriends SUCCESSS: ", friendArr);
         friendArr.forEach(friend => {
           console.log(friend.name);
         });
       })
       .catch((response) => {
         console.log('Error: ', response);
       });
   }

  addFriend() {
    let URL_array = window.location.pathname.split('/profile/');
    axios.post('/add_friend', {friend1: this.props.authData.email, friend2: URL_array[1]})
      .then((response) => {
        console.log(response);
        if(response.data.action === "removed") {
          document.getElementById("followBtn").style.background='#d3d3d3';
          document.getElementById("followBtn").firstChild.data='follow';
        }
        else {
          document.getElementById("followBtn").style.background='#556B2F';
          document.getElementById("followBtn").firstChild.data='following';
        }
      });
    
  }

  editProflie() {
    browserHistory.push('/profile_setup');
  }

  render () {

    return (

      <div className="container">
        {/* Profile Header */}
        <div className="row" id="profile_heading">
          <div className="col-lg-12">
            <h1>
              <span className="user-name">{this.props.profile.name}</span>
              <small className="location">{this.props.profile.location || "San Francisco, CA"}</small>
            </h1>
          </div>
        </div>
        {/* Profile Grid */}
        <div className="col-md-4" id="user_friends">
          <div className="row" id="user">
            <div className="profile_pic">
              <img className="img-responsive" src={this.props.profile.pic_path}/>
            </div>
            <button id="followBtn" onClick = {this.addFriend.bind(this)}> Follow </button>
          </div>
          <div className="row" id="friends-component">
            <h3>Friends</h3>
            <FriendList />
            <a>See All Friends</a>
          </div>
        </div>
        <div className="col-md-1" id="barrier">
        </div>
        <div className="col-md-7" id="bio_games">
          <div className="row" id="bio">
            <p>{this.props.profile.bio || "Hi, I haven\'t filled out my bio yet!"}</p>
            <a onClick={this.editProflie.bind(this)}>Edit Profile</a>
          </div>
          <div className="row">
            <h3>Games</h3>
            <p><strong>Really Good At:</strong></p>
            <p>Altered Beast, Twilight Imperium, Boss Monster, We Did Not Playtest This At All, Android: Netrunner</p>
            <p><strong>Enjoys Playing:</strong></p>
            <p>Gloom, Magic: the Gathering, WWE Smackdown 2012, Limbo, Settlers of Catan, Shadow Hunters</p>
            <p><strong>Interested In Trying:</strong></p>
            <p>Fast Food Magnate, Vampire: the Masquerade</p>
            <a>Add Game</a>
          </div>
          <div className="row">
            <h3>Media</h3>
            <div>
              <iframe width={336} height={189} src="https://www.youtube.com/embed/mLyOj_QD4a4" frameBorder={0} allowFullScreen />
            </div>
            <a>Add Media</a>
          </div>
        </div>
      </div>
    );

    //Old profile rendering code:

    // return (
    //     <div>
    //       <div>
    //         <h1>
    //         {this.props.profile.name}
    //         </h1>
    //         <h2>
    //         Contact:
    //         {this.props.authData.name}
    //         </h2>
    //       </div>
    //       <div>
    //         insert profile pic element
    //         <img src={this.props.profile.pic_path}/>
    //         <h2> Location :
    //         {this.props.profile.location}
    //         </h2>
    //         <div>
    //           <h2>
    //           Bio:
    //         {this.props.profile.bio}
    //           </h2>
    //         </div>
    //         <div>
    //           Here are all your friends:
    //           <FriendList />
    //         </div>
    //         <div>
    //           Here is the media element:
    //           {this.props.media[1]}
    //         </div>
    //       </div>
    //       <div>
    //       Here is a the games:
    //        {this.props.games[1]}
    //       </div>
    //       <div>
    //         <button onClick = {this.getState.bind(this)}> Get state </button>
    //         <button onClick = {this.findFriends.bind(this)}> Find friends </button>
    //         <Games />
    //         <FavMedia />
    //       </div>
    //     </div>
    // );

  }

}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({postProfile, showFriends}, dispatch);
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
