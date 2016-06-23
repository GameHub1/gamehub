import React, {Component} from 'react';
import {connect} from 'react-redux';

export class GameList extends Component {
  	render() {
			return (
			<div>
	  	<h3>Favorite Games</h3>
				<ul>
				{this.props.games.map((game, index) => {
					return (<li>{game}</li>); 
				})}
			 </ul>
		 </div>
		);
	}
}

//connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

// this.props.games.map((game, index) => {
// 	if (index === this.props.games.length - 1 && this.props.games.length > 2) {
// 		return (<span key={game}>{"and  " + game}</span>);
// 	}
// 	else if (index === 0 && this.props.games.length === 2) {
// 		return(<span key={game}>{game + "  "}</span>)
// 	}
// 	else if (index === 0 && this.props.games.length === 1) {
// 		return (<span key={game}>{game}</span>);
// 	}
// 	else {
// 		return (<span key={game}>{game + ",  "}</span>);
// 	}
// })

function mapStateToProps(state) {
	return {
		games: state.games
	};
}

export default connect(mapStateToProps)(GameList);
