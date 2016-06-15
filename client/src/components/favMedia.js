import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {createFavMedia} from '../actions/index';

class FavMedia extends Component {
  onSubmit(prop) {
    this.props.createFavMedia([this.props.authData.email, prop]);
  }

  render() {
    const {fields: {favMediaURL}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div id="favMedia" className="form-group">
          {this.props.authData.email}
          <input type="text" placeholder="submit url from Youtube" className="form-control" {...favMediaURL} /><br/>
          <button type="submit" className="btn btn-primary">Post</button>
        </div>
      </form>
    );
  }
}

// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
function mapStateToProps(state) {
  return {
    authData: state.authData
  };
}

export default reduxForm({
  form: 'FavMediaForm',
  fields: ['favMediaURL']
}, mapStateToProps, {createFavMedia})(FavMedia);