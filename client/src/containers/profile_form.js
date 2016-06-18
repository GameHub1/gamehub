import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {postProfile} from '../actions/index.js';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';


class ProfileForm extends Component {
  onSubmit(prop) {
    console.log('This is props', prop);
    let prop2 = {
      name: prop.name,
      location: prop.location,
      bio: prop.bio,
      email: this.props.authData.email
    };
    this.props.postProfile(prop2);

    setTimeout(function () {
    browserHistory.push(`/profile/${this.props.authData.email}`);
    }.bind(this), 500)
  }

  render () {
    const {fields: {name, location, bio}, handleSubmit} = this.props;
    return (
      <div>
        <h1> Set up Profile! </h1>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <label>First name and last name </label>
            <input type="text" value={this.props.authData.name} {...name}/>
          </div>
          <br/>

          <div>
            <label> Location </label>
            <input type="text" value={"San Francisco, CA"} {...location} />
          </div>
          <br/>

          <div>
            <label> Small bio </label>
            <textarea rows = '10' cols = '50' {...bio}/>
          </div>
          <br/>

          <button type="submit">Create profile </button>

        </form>


      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
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

// export default reduxForm ({
//   form: "ProfileForm",
//   fields: ['location', 'bio']},
//   null, mapDispatchToProps)(ProfileForm)

  //onSubmit={handleSubmit(this.onSubmit.bind(this))}
