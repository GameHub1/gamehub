import React, {Component} from 'react';
import {reduxForm, reset} from 'redux-form';
import {createFavMedia} from '../actions/index';
import {browserHistory} from 'react-router';


class FavMedia extends Component {
  constructor(props) {
    super(props);

    this.state = {url: ''};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(prop, dispatch) {
    this.props.createFavMedia([prop, this.props.profile.email])
      .then(response => {
        dispatch(reset('FavMediaForm'));
      })
  }

  render() {
    const {fields: {favMediaURL}, handleSubmit} = this.props;

    return (
      <form id="favMediaForm" onSubmit={handleSubmit(this.onSubmit)}>
        <div className="input-group">
          <input
            id="mediaInput"
            type="text" 
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
    authData: state.authData,
    media: state.media
  };
}

export default reduxForm({
  form: 'FavMediaForm',
  fields: ['favMediaURL']
}, mapStateToProps, {createFavMedia})(FavMedia);