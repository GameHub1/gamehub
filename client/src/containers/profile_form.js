import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {postProfile} from '../actions/index.js';
import {Link} from 'react-router';
import Games from '../components/games';

class ProfileForm extends Component {

  onSubmit(prop) {
    console.log('This is props', prop);
    this.props.postProfile(prop);

  }

  render () {

    const {fields: {location, bio}, handleSubmit} = this.props;
    return (
      <div>
        <h1> Set up Profile! </h1>


        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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

        <Games />
      </div>

      )
  }

}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({postProfile}, dispatch)
}


export default ProfileForm = reduxForm({
  form: 'profile',
  fields: ['location', 'bio']
}, null, mapDispatchToProps)(ProfileForm);


// export default reduxForm ({
//   form: "ProfileForm",
//   fields: ['location', 'bio']},
//   null, mapDispatchToProps)(ProfileForm)

  //onSubmit={handleSubmit(this.onSubmit.bind(this))}
