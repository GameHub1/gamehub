import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {postProfile} from '../actions/index.js'

class ProfileForm extends Component {


  render () {

    const {fields: {location, bio}, handleSubmit} = this.props;
    return (
      <div>
        <h1> Set up Profile! </h1>


        <form onSubmit={handleSubmit}>
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
})(ProfileForm);


// export default reduxForm ({
//   form: "ProfileForm",
//   fields: ['location', 'bio']},
//   null, mapDispatchToProps)(ProfileForm)

  //onSubmit={handleSubmit(this.onSubmit.bind(this))}
