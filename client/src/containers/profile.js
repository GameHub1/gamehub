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
          bio: response.data.found.bio
        };
        this.props.postProfile([prop, this.props.authData.email, response.data.found.pic_path]);
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

    return (
        <div>
          <div>
            <h1>
            {this.props.profile.name}
            </h1>
            <h2>
            Contact:
            {this.props.authData.name}
            </h2>
          </div>
          <div>
            insert profile pic element
            <img src={this.props.profile[2]}/>
            <h2> Location :
            {this.props.profile.location}
            </h2>
            <div>
              <h2>
              Bio:
            {this.props.profile.bio}
              </h2>
            </div>
            <div>
              Here are all your friends:
              <FriendList />
            </div>
            <div>
              Here is the media element:
              {this.props.media[1]}
            </div>
          </div>
          <div>
          Here is a the games:
           {this.props.games[1]}
          </div>
          <div>
            <button onClick = {this.getState.bind(this)}> Get state </button>
            <button onClick = {this.findFriends.bind(this)}> Find friends </button>
            <Games />
            <FavMedia />
          </div>
        </div>
    );

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
