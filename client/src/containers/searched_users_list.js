import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';

class SearchedUsers extends Component {
  // constructor(props) {
  //   super(props);

  //   this.goToUserProfile = this.goToUserProfile.bind(this);
  // }

  // goToUserProfile(event) {
  //   console.log(event)
  //   // browserHistory.push(`/profile/${email}`);
  // }

  renderUsers(userData) {
    const fullname = userData.fullname;
    const email = userData.email;

    return ( 
      <tr id="searchedUsersRow" key={email}>
        <td><span className="glyphicon glyphicon-user"></span></td>
        <td><Link to={`/profile/${email}`}>{fullname}</Link></td>
        <td><Link to={`/profile/${email}`}>{email}</Link></td>
      </tr>
    );
  }

  render() {
    console.log(this.props.searched_users)
    return (
      <table id="userList">
        <tbody>
          {this.props.searched_users.map(this.renderUsers)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({searched_users}) {
  return {searched_users};
}

export default connect(mapStateToProps)(SearchedUsers);