import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchedUsers extends Component {
  renderUsers(userData) {
    const fullname = userData.fullname;
    const email = userData.email;

    return (
      <tr key={email}>
        <td><div>{fullname}</div></td>
        <td><div>{email}</div></td>
      </tr>
    )
  }

  render() {
    console.log(this.props.searched_users)
    return (
      <table id="userList" className="table table-hover">
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