import React, {Component} from 'react';
import {connect} from 'react-redux'




export class MessagePage extends Component {



  render () {

      return (
        <div>
            <h1> Messages </h1>
        </div>

        );

  }

};


function mapStateToProps (state) {
  return {
    friendList: state.friendList
  }
}



export default connect(mapStateToProps, null) (MessagePage);