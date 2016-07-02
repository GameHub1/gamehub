import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

export class GameList extends Component {
  goToGamesPage(game) {
    browserHistory.push(`/game/${game}`);
  }

  render() {
    let firstThird = Math.ceil(this.props.games.length / 3);
    let secondThird = Math.ceil(firstThird * 2);
    let firstSection = this.props.games.slice(0, firstThird);
    let secondSection = this.props.games.slice(firstThird, secondThird);
    let thirdSection = this.props.games.slice(secondThird);

    return (
      <div className="game-list">
        <div className="row">
          <div className="col-md-4">
            <ul>
              {firstSection.map((game) => {
                return (
                  <li key={game} onClick={() => {this.goToGamesPage(game);}}>
                    <span className="glyphicon glyphicon-star-empty"></span> {game}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              {secondSection.map((game) => {
                return (
                  <li key={game} onClick={() => {this.goToGamesPage(game);}}>
                    <span className="glyphicon glyphicon-star-empty"></span> {game}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              {thirdSection.map((game) => {
                return (
                  <li key={game} onClick={() => {this.goToGamesPage(game);}}>
                    <span className="glyphicon glyphicon-star-empty"></span> {game}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		games: state.games,
    authData: state.authData
	};
}

export default connect(mapStateToProps)(GameList);
