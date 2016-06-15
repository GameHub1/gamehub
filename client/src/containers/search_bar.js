import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUsers} from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {searchTerm: ''};
    // // do this bind instead of making onclick an anonymous function
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    // we need to go and fetch weather data
    this.props.fetchUsers({searchTerm: this.state.searchTerm});
    console.log(this.state.searchTerm);
    // this.setState({searchTerm: ''});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input 
            className="form-control"
            placeholder="search for a friend"
            value={this.state.searchTerm}
            onChange={this.onInputChange}/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchUsers: fetchUsers}, dispatch);
}

// we are passing 'null' because we dont have any mapStateToProps argument 
export default connect(null, mapDispatchToProps)(SearchBar);