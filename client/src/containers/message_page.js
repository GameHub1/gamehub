import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showFriends, selectFriend} from '../actions/index';
import axios from 'axios';
import FriendList from './friend_list';




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

      return (
        <div>  
          <div>
              <h1> Messages </h1>
          </div>
          <div className='col-md-4'>
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
          <div className='col-md-7'>
            <div className='row'>
              <form>
                  <label> Write Message </label>
                  <textarea rows = '10' cols= '50'/>
              </form>
            </div>
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