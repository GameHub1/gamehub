import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showFriends, selectFriend} from '../actions/index';
import axios from 'axios';
import FriendList from './friend_list';
import Conversation from './conversation'




export class MessagePage extends Component {

  componentWillMount () {
    axios.post('/show_friends', {email: this.props.params.id})
       .then((response) => {
         let friendArr = response.data.data;
         this.props.showFriends(friendArr);
        });
  }

  chooseFriend (friend) {
    console.log("friend: ", friend);
    this.props.selectFriend(friend);
    setTimeout(() => {console.log(this.props.selectedFriend);},500);
  }

  render () {

    var socket = io.connect('http://localhost/kyle');
    socket.emit('message', "We sent it full circle");
    socket.on('message', function (msg) {
       console.log(msg);
    });

      return (
        <div>  
          <div>
              <h1> Messages </h1>
              <br/>
              <br/>
          </div>
          <div className='col-md-1'>
          </div>
          <div className='col-md-3'>
            <div className="row">
              <table>
                <tbody>
                  {this.props.friendList.map(item => {
                    return (
                    <tr onClick={() => {this.chooseFriend(item.email)}} key={item.name}>
                    <td className="friend_pic">
                    <img src={item.pic_path}/>
                    </td>
                    <td>
                    {item.name}
                    </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-md-1'>
          </div>
          <div className='col-md-6'>
            <div className='row'>
              <Conversation/>
            </div>
            <div className='row'>
              <form>
                  <label> Write Message </label>
                  <textarea rows = '2' cols= '50'/>
                  <input type="submit" value="Send"/>
              </form>
            </div>
          </div>
          <div className='col-md-1'>
          </div>
        </div>

        );

  }

};


function mapStateToProps (state) {
  return {
    friendList: state.friendList,
    selectedFriend: state.selectedFriend
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showFriends, selectFriend}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (MessagePage);