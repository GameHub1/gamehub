import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {createFavMedia} from '../actions/index';

class FavMedia extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(prop) {
    this.props.createFavMedia([prop, this.props.authData.email]);
  }

  render() {
    const {fields: {favMediaURL}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {this.props.authData.email}
        <div id="favMedia" className="input-group">
          <input type="text" 
            placeholder="submit url from Youtube" 
            className="form-control" 
            aria-describedby="basic-addon2" {...favMediaURL} />
          <span type="submit" className="input-group-addon" id="basic-addon2">Submit</span>
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