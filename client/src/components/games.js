import React, {Component} from 'react';
import { reduxForm } from 'redux-form';

class Games extends Component {
  
	addGame() {


	}

  	render() {
  		const { fields: { gameTitle }, handleSubmit } = this.props;
		return (
		<div>
	  	<form  onSubmit={handleSubmit}>
	  		<div>
	  			<label> Game: </label>
	  			<input type="text" id="textinput"> {...gameTitle} </input>
	  			<button onClick={this.addGame}> Add Game </button>
	  		</div>
	  	</form>
	  	Games:
	  	</div>
	  	)
	  }
}


export default reduxForm({
	form: 'GamesForm',
	fields: ['gameTitle']
})(Games);

