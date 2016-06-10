import React, {Component} from 'react';

export default class Login extends Component {
  constructor() {
    this.state = {
      user: '',
      password: ''
    };
  }

  render() {
    return (
      <form onSubmit={() => console.log('hii there')}>
        <div>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}