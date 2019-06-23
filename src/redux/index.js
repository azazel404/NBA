import { combineReducers } from 'redux';
import UserReducers from './reducers/UserReducers';
import GamesReducers from './reducers/GamesReducers';
import NewsReducers from './reducers/NewsReducers';

const rootReducers = combineReducers({
  News: NewsReducers,
  Users: UserReducers,
  Games: GamesReducers
});

export default rootReducers;
