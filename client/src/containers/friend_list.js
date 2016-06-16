import React, {Component, PropTyes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


export class FriendList extends Component {

  render () {

    return (
      <div>
        <ul>
          {this.props.friendList.map(item => {
            return <li key={item.name}>{item.name}</li>
          })}
        </ul>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    friendList: state.friendList
  };
}

export default connect(mapStateToProps, null)(FriendList);
