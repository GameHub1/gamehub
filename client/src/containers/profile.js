import React, {Component, PropTyes} from 'react';
import {bindActionCreators} from 'redux';


export default class Profile extends Component {

  render () {

    return ( 
        <div>
          <div>
            <h1> 
            //Add name here 
            </h1>
          </div>
          <div>
            //insert profile pic element
            <h2> Location : 
            //add location
            </h2>
            <div>
              //add media element
            </div>
          </div>
          <div>
          //insert games element
          </div>
        </div>
    );

  }

}

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

