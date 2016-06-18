import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {createFavMedia} from '../actions/index';
import {browserHistory} from 'react-router';

class FavMedia extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(prop) {
    this.props.createFavMedia([prop, this.props.profile.id]);

    setTimeout(function () {
    browserHistory.push(`/profile/${this.props.authData.email}`);
    }.bind(this), 500);
  }

  render() {
    const {fields: {favMediaURL}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {this.props.profile.id}
        <div id="favMedia" className="input-group">
          <input type="text" 
            placeholder="submit your best gameplays" 
            className="form-control" 
            aria-describedby="basic-addon2" {...favMediaURL} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default">Submit</button>
          </span>
        </div>
      </form>
    );
  }
}

// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
function mapStateToProps(state) {
  return {
    profile: state.profile,
    authData: state.authData
  };
}

export default reduxForm({
  form: 'FavMediaForm',
  fields: ['favMediaURL']
}, mapStateToProps, {createFavMedia})(FavMedia);