import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {createFavMedia} from '../actions/index';

class FavMedia extends Component {
  render() {
    const {fields: {favMediaURL}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.createFavMedia)}>
        <div id="favMedia" className="form-group">
          <input type="text" placeholder="submit url from Youtube" className="form-control" {...favMediaURL} /><br/>
          <button type="submit" className="btn btn-primary">Post</button>
        </div>
      </form>
    );
  }
}

// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'FavMediaForm',
  fields: ['favMediaURL']
}, null, {createFavMedia})(FavMedia);