import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchedUsers extends Component {
  render() {
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