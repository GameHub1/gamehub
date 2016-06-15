import React, {Component, PropTyes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


export class Profile extends Component {
 
   

  render () {

    return ( 
        <div>
          <div>
            <h1> 
            {this.props.authData.name}
            </h1>
          </div>
          <div>
            insert profile pic element
            <h2> Location : 
            {this.props.profile.location}
            </h2>
            <div> 
              <h2>
              Bio:
            {this.props.profile.bio}
              </h2>
            </div>
            <div>
              add media element
            </div>
          </div>
          <div>
          insert games element
          </div>
        </div>
    );

  }

}


function mapStateToProps(state) {
  return {
    profile: state.profile,
    authData: state.authData,
    form: state.form
  }
}

export default connect(mapStateToProps, null)(Profile)
