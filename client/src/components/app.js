import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {authentication} from '../actions/index';
import ReduxLogin from './login_redux';

export default class App extends Component {
  render() {
    return (
      <div>
        <Link to="/profile_setup"> Go to profile setup </Link>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({authentication: authentication}, dispatch)
}

module.exports = App;