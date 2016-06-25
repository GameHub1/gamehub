import React, {Component} from 'react';
import {connect} from 'react-redux';
import { deleteGame } from '../actions/index';
import {browserHistory} from 'react-router';

export class GameList extends Component {
    
    goToGamesPage(game) {
    browserHistory.push(`/game/${game}`);
  }

    onItemClick(item, e) {
      console.log(item);
      //this.props.deleteGame([{gameTitle: item}, this.props.authData.email]);
    }

  	render() {
			return (
			<div>
	  	<h3>Favorite Games</h3>
				<ul>
				{this.props.games.map((game, index) => {
          //let boundItemClick = this.onItemClick.bind(this, game);
					return (<li key={game} onClick={() => {this.goToGamesPage(game);}}>{game}</li>);
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({deleteGame}, dispatch);
}


function mapStateToProps(state) {
	return {
		games: state.games,
    authData: state.authData
	};
}

export default connect(mapStateToProps)(GameList);
