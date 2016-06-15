import React, {Component} from 'react';


export default class RootComponent extends Component {
  
   render () {
      return (
          <div>
          <header>
            <h1> GAMEHUB </h1>
          </header>
          {this.props.children}
          </div>

        )
   }


}