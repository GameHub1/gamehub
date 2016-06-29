import React, {Component} from 'react';
import {connect} from 'react-redux';



export class Conversation extends Component {



    render () {

        return (
            <section>
              <div className="conversation">
                <h3> Conversation </h3>
              </div>
            </section>
          )


    }

}

export default connect(null, null) (Conversation);