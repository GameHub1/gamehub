
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {postProfile} from '../../actions/index.js'
 class ProfileFormOLD extends Component {


  render () {
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
            <input type="textarea" {...bio}/>
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

export default class ProfileForm extends Component {
  render() {
    return (
      <div>
        Hello world!
      </div>
    )
  }
}

  
// reduxForm ({
//   form: "ProfileForm",
//   fields: ['location', 'bio']},
//   null, mapDispatchToProps)(ProfileForm)
