import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showFriends, selectFriend, getMessages} from '../actions/index';
import axios from 'axios';
import FriendList from './friend_list';
import Conversation from './conversation'




export class MessagePage extends Component {

  constructor(props) {
    super(props);

    this.state = {channel: true};



  }


  componentWillMount () {
    axios.post('/show_friends', {email: this.props.params.id})
       .then((response) => {
         let friendArr = response.data.data;
         this.props.showFriends(friendArr);
        });
  }

  chooseFriend (friend) {
    this.props.selectFriend(friend);
    let arrayOfEmails = [this.props.params.id, friend];
    let sortedEmails = arrayOfEmails.sort();


    let identifier = arrayOfEmails[0] + arrayOfEmails[1];
    identifier = identifier.replace(/[^a-zA-Z0-9 ]/g, "");

    $('.conversation').empty();

    this.props.getMessages({data:identifier});



    this.setState({channel: identifier}, function () {

    console.log('This is the state', this.state.channel);

  });
  }

  sendMessage(event) {

      event.preventDefault();

      let msgText = $('.messageToSend').val();

      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes()

      let msg = {text: msgText, hours: hours, minutes: minutes, sender: this.props.profile.name};

      console.log("This is the msg", msg);

      let channel = io.connect('http://localhost/' + this.state.channel);

      channel.emit('message', msg);

      channel.on('updateConversation', function (msg) {
         // update state
         console.log('inside update conversation!');
         
         if (msg.hours > 12) {
           msg.hours = msg.hours -12
         }

         $('.conversation').append('<div>' + msg.hours +':' + msg.minutes + ' ' + msg.sender + ": " + msg.text + '</div>');
      });

/// example code below

      let socket = io.connect('http://localhost/kyle');

      socket.emit('message', "We sent it full circle");
      socket.on('message', function (msg) {
         console.log(msg);

      });

  }

  render () {

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
                  <textarea className='messageToSend' rows = '2' cols= '50'/>
                  <button onClick={(event)=> {this.sendMessage(event)}}>Send</button>
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
    selectedFriend: state.selectedFriend,
    profile: state.profile
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showFriends, selectFriend, getMessages}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (MessagePage);
