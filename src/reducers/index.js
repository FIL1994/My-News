import { combineReducers } from 'redux';
import NewsReducer from './reducer_news';

const rootReducer = combineReducers({
  state: (state = {}) => state,
    newsResults : NewsReducer
});

export default rootReducer;
