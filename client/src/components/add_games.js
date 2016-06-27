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
      <form onSubmit={handleSubmit(this.onSubmitPlus.bind(this))}>
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="what do you like to play?"
            aria-describedby="basic-addon2"
            {...gameTitle} 
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default">Add Game</button>
          </span>
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
