import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { createGame } from '../actions/index';

class GameList extends Component {

	onSubmitPlus(prop) {
		this.props.createGame([prop, this.props.authData.email]);
	}

  	render() {
  		const { fields: { gameTitle }, handleSubmit } = this.props;
			return (
			<div>
		  	<form  onSubmit={handleSubmit(this.onSubmitPlus.bind(this))}>
		  		<div>
		  			<label> Add Game: </label>
		  			<input type="text" {...gameTitle}></input>
		  			<button type="submit"> Add Game </button>
		  		</div>
		  	</form>
	  	<h3>Favorite Games</h3> 
	  	</div>
	  	)
	  }
}


function mapStateToProps(state) {
	return {
		authData: state.authData
	};
}

//connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	form: 'GamesForm',
	fields: ['gameTitle']
},mapStateToProps,{ createGame })(GameList);
