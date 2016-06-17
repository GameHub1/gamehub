import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchedUsers extends Component {
  renderUsers(userData) {
    const fullname = userData.fullname;
    const email = userData.email;

    return ( 
      <table>
          <tr id="searchedUsersRow" key={email}>
            <td><span className="glyphicon glyphicon-user">&nbsp;</span></td>
            <td>&nbsp;{fullname}&nbsp;&nbsp;|&nbsp;</td>
            <td>&nbsp;{email}</td>
          </tr>
      </table>
    )
  }

  render() {
    console.log(this.props.searched_users)
    return (
      <ul id="userList">
        {this.props.searched_users.map(this.renderUsers)}
      </ul>
    );
  }
}

function mapStateToProps({searched_users}) {
  return {searched_users};
}

export default connect(mapStateToProps)(SearchedUsers);