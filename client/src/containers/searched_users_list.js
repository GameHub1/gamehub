import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchedUsers extends Component {
  render() {
    console.log(this.props.searched_users)
    return (
      <div>
        hi
      </div>
    );
  }
}

function mapStateToProps({searched_users}) {
  return {searched_users};
}

export default connect(mapStateToProps)(SearchedUsers);