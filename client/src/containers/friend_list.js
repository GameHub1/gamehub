import React, {Component, PropTyes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


export class FriendList extends Component {

  render () {

    return (
      <div>
          {this.props.friendList.map(item => {
            return <div key={item.name}>{item.name}</div>
          })}
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
