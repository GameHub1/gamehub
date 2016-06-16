import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {postProfile} from '../actions/index.js';
import {Link} from 'react-router';


class ProfileForm extends Component {
  onSubmit(prop) {
    console.log('This is props', prop);
    this.props.postProfile([prop,this.props.authData.email]);
  }

  render () {
    const {fields: {name, location, bio}, handleSubmit} = this.props;
    return (
      <div>
        <h1> Set up Profile! </h1>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <label>First name and last name </label>
            <input type="text"  {...name}/>
          </div>
          <br/>

          <div>
            <label> Location </label>
            <input type="text" {...location}/>
          </div>
          <br/>

          <div>
            <label> Small bio </label>
            <textarea rows = '10' cols = '50' {...bio} />
          </div>
          <br/>

          <button type="submit">Create profile </button>

        </form>
        <Link to="/profile"> Go to profile </Link>
       
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
