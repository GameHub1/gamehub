import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { createGame } from '../actions/index';

export class AddGames extends Component {

  onSubmitPlus(prop) {
    this.props.createGame([prop, this.props.authData.email]);
  }

  render() {
    const { fields: { gameTitle }, handleSubmit } = this.props;
    return (
      <form  onSubmit={handleSubmit(this.onSubmitPlus.bind(this))}>
        <div>
          <label> Add Game: </label>
          <input type="text" {...gameTitle}></input>
          <button type="submit"> Add Game </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
	return {
		authData: state.authData
	};
}

export default reduxForm({
	form: 'GamesForm',
	fields: ['gameTitle']
},mapStateToProps,{ createGame })(AddGames);
