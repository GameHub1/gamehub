import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {postProfile} from '../actions/index';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';


class ProfileForm extends Component {
  onSubmit(prop) {
    let prop2 = {
      name: prop.name,
      location: prop.location,
      bio: prop.bio,
      email: this.props.authData.email
    };
    this.props.postProfile(prop2);

    setTimeout(function() {
      browserHistory.push(`/profile/${this.props.authData.email}`);
    }.bind(this), 500);

    // return new Promise((resolve, reject) => {
    //   let prop2 = {
    //     name: prop.name,
    //     location: prop.location,
    //     bio: prop.bio,
    //     email: this.props.authData.email
    //   };

    //   resolve({email: this.props.authData.email, prop2: prop2});
    // })
    // .then(data => {
    //   this.props.postProfile(data.prop2);
    //   return data.email;
    // })
    // .then(authDataEmail => {
    // browserHistory.push(`/profile/${authDataEmail}`);
    // })
  }

  onCancel() {
    browserHistory.push(`/profile/${this.props.authData.email}`);
  }

  render() {
    const {fields: {name, location, bio}, handleSubmit} = this.props;
    return (
      <div className="createProfileSection">
        <h1>Tell us about yourself.</h1>
        <br/>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">First & Last Name</span>
            <input type="text" className="form-control" 
              aria-describedby="basic-addon1"
              {...name} />
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">Location</span>
            <input type="text" className="form-control" 
              aria-describedby="basic-addon1"
              {...location} />
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">About You</span>
            <textarea type="text" className="form-control" 
              aria-describedby="basic-addon1"
              rows="4" cols="10"
              {...bio} />
          </div>
          <br/>
          <div className="profile-btn">
              <button onClick={() => {onCancel.bind(this)}} className="btn btn-secondary">Cancel</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button type="submit" className="btn btn-primary">Create Profile</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({postProfile}, dispatch);
}

function mapStateToProps(state) {
  return {
    authData: state.authData
  };
}

export default ProfileForm = reduxForm({
  form: 'profile',
  fields: ['name', 'location', 'bio']
}, mapStateToProps, mapDispatchToProps)(ProfileForm);
