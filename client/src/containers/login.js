import React, {Component} from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: ''
    };
  }

  login(event) {
    event.preventDefault();
    console.log(event);
  }

  // render() {
  //   return (
  //     <div>
  //       <form onSubmit={this.login.bind(this)}>
  //         <input type="text" placeholder="Username" />
  //         <input type="text" placeholder="Password" />
  //         <button type="submit">Submit</button>
  //       </form>
  //     </div>
  //   );
  // }
}