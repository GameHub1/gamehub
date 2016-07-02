import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showFriends, selectFriend, getMessages} from '../actions/index';
import axios from 'axios';
import FriendList from './friend_list';
import Conversation from './conversation';

export class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {channel: true, flag: true};
  }

  componentWillMount() {
    axios.post('/show_friends', {email: this.props.params.id})
      .then(response => {
        let friendArr = response.data.data;
        this.props.showFriends(friendArr);
      });
  }

  chooseFriend(friend, friendName) {
    let storage = {};
    this.props.selectFriend(friend);
    let arrayOfEmails = [this.props.params.id, friend];
    let sortedEmails = arrayOfEmails.sort();
    let identifier = arrayOfEmails[0] + arrayOfEmails[1];
    identifier = identifier.replace(/[^a-zA-Z0-9 ]/g, "");

    $('.conversation').empty();

    this.props.getMessages({data:identifier});
    this.setState({channel: identifier}, () => {

    let channel = io.connect('/' + this.state.channel);

    channel.emit('create', 'gamehub');

    $('.conversation').append('<div><h4>You are now chatting with: ' + friendName + '</h4></div>');

    channel.on('updateConversation', function (msg) {
      // update state
      let AMPM = 'AM';
      if (msg.hours > 12) {
        msg.hours = msg.hours -12
        AMPM = 'PM';
      }

      if (!storage[msg.time]) {
        storage[msg.time] = msg.text;
        $('.conversation').append('<div>' + msg.hours +':' + msg.minutes + ' ' + AMPM + ' ' + msg.sender + ": " + msg.text + '</div>');
      } else {
        return;
      }
    });

    this.setState({flag: true})
    });
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      this.sendMessage(event);
    }
  }

  sendMessage(event) {
    event.preventDefault();

    let msgText = $('.messageToSend').val();
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    console.log(minutes);
    console.log(minutes.toString().length);
    if (minutes.toString().length === 1) {
      minutes = '0' + minutes;
    }
    let time = date.getTime();
    let msg = {time: time, text: msgText, hours: hours, minutes: minutes, sender: this.props.authData.name};
    let channel = io.connect('/' + this.state.channel);

    channel.emit('create', 'gamehub');
    channel.emit('message', msg);

    document.getElementById("messageForm").reset();
  }

  render() {
    return (
      <div>
        <div className='col-md-1'>
        </div>
        <div className='col-md-3'>
          <div className="row message-frds-section">
            <h3 className="message-headers">Friends List</h3>
            Choose someone you want to chat with:
            <br/><br/>
            <table className="message-list">
              <tbody>
                {this.props.friendList.map(item => {
                  return (
                    <tr className="message-friend" onClick={() => {this.chooseFriend(item.email, item.name)}} key={item.name}>
                      <td className="friend_pic">
                        <img className="img-rounded" src={item.pic_path}/>
                      </td>
                      <td>
                        {item.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='col-md-1'>
        </div>
        <div className='col-md-6'>
          <div className="row">
            <h3>Chatterbox</h3>
            <Conversation />
          </div>
          <div className="row form-group">
            <form id="messageForm">
              <br/><span>Type your message...</span><br/>
              <textarea className="form-control" onKeyPress={(event) => {this.handleKeyPress(event)}} className="messageToSend" rows="2" cols="50"/>
              <br/>
              <button className="btn btn-secondary" onClick={(event)=> {this.sendMessage(event)}}>Send</button>
            </form>
          </div>
        </div>
        <div className="col-md-1">
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    friendList: state.friendList,
    selectedFriend: state.selectedFriend,
    profile: state.profile,
    authData: state.authData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({showFriends, selectFriend, getMessages}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage);
