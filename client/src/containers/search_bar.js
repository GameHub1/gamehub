import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUsers} from '../actions/index';
import _ from 'underscore';
import SearchedUsersList from '../containers/searched_users_list';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {searchTerm: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onChangeSubmit = _.debounce(this.onChangeSubmit.bind(this), 200);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    event.persist();
    this.setState({searchTerm: event.target.value}, this.onChangeSubmit(event));
  }

  onChangeSubmit(event) {
    this.props.fetchUsers({searchTerm: this.state.searchTerm});
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchUsers({searchTerm: this.state.searchTerm});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} role="search">
          <div>
            <input className="searchBar"
              type="text"
              placeholder="search for a friend"
              value={this.state.searchTerm}
              onChange={this.onInputChange}/>&nbsp;<button type="submit" className="btn btn-default">Submit</button>
              <SearchedUsersList />
          </div>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchUsers: fetchUsers}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);