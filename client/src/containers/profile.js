import React, {Component, PropTyes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Games from '../components/games';
import FavMedia from '../components/favMedia';
import axios from 'axios';
import FriendList from './friend_list';
import {showFriends} from '../actions/index';
import {postProfile} from '../actions/index.js';

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

  render () {
    console.log("PROFILE: ", this.props.profile);

    return (
      <div id="profile">
        <div class="row" id="profile_heading">
          <div class="col-lg-12">
            <h1 class="page-header">{this.props.profile.name}
              <small>{this.props.profile.location}</small>
            </h1>
          </div>
        </div>

        <div class="col-md-4" id="user_friends">
          <div class="row" id="user">
            <div id="profile_pic">
              <img src={this.props.profile.pic_path}/>
              </div>
              <button>Send Friend Request</button>
              </div>
          <div class="row" id="friends-component">
            <h3>Friends</h3>
            <p>Kyle</p>
            <p>Michael</p>
            <p>Gina</p>
            <a>See All Friends</a>
          </div>
        </div>

        <div class="col-md-8" id="bio_games">
          <div class="row" id="bio">
            {this.props.profile.bio}
          </div>
          <div class="row">
            <h3>Games</h3>
            <p><strong>Really Good At:</strong></p>
            <p>Altered Beast, Twilight Imperium, Boss Monster, We Did Not Playtest This At All, Android: Netrunner</p>
            <p><strong>Enjoys Playing:</strong></p>
            <p>Gloom, Magic: the Gathering, WWE Smackdown 2012, Limbo, Settlers of Catan, Shadow Hunters</p>
            <p><strong>Interested In Trying:</strong></p>
            <p>Fast Food Magnate, Vampire: the Masquerade</p>
            <a>Add Game</a>
          </div>
          <div class="row">
            <h3>Media</h3>
            <div>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/mLyOj_QD4a4" frameborder="0" allowfullscreen></iframe>
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
