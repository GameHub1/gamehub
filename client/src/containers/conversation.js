import React, {Component} from 'react';
import {connect} from 'react-redux';

export class Conversation extends Component {
  render() {
    return (
      <section>
        <div className="conversation">
        </div>
      </section>
    );
  }
}

export default connect(null, null) (Conversation);