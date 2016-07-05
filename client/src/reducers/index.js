import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authData from './jwt_reducer'
import profile from './profile_reducer';
import games from './games_reducer';
import media from './favmedia_reducer.js';
import promise from 'redux-promise'
import searchedUsers from './searched_users_reducer';
import friendList from './friend_reducer.js';
import gameFans from './game_fans_reducer';
import selectedFriend from './selected_friend';
import messages from './message_reducer';
import searchedGames from './searched_games_reducer';
import followerList from './follower_reducer';

const reducers = {
  form: formReducer,
  authData: authData,
  profile: profile,
  games: games,
  media: media,
  searched_users: searchedUsers,
  friendList: friendList,
  gameFans: gameFans,
  searched_games: searchedGames,
  selectedFriend: selectedFriend,
  messages: messages,
  followerList: followerList
};

const reducer = combineReducers(reducers);

const storeHolder = createStore(reducer, {}, applyMiddleware(promise));

export default storeHolder;
