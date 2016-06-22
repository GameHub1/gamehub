import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { createGame } from '../actions/index';

export class GameList extends Component {

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
				<div>
				{this.props.games.map((game, index) => {
					if (index === this.props.games.length - 1) {
						return (<span>{"and  " + game}</span>);

					}
					else if (index === 0 && this.props.games.length === 2) {
						return(<span>{game + "  "}</span>)
					}
					else {
						return (<span>{game + ",  "}</span>);
					}
				})}
			 </div>
		 </div>
		);
	  }
}

//connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

function mapStateToProps(state) {
	return {
		authData: state.authData,
		games: state.games
	};
}

export default reduxForm({
	form: 'GamesForm',
	fields: ['gameTitle']
},mapStateToProps,{ createGame })(GameList);
