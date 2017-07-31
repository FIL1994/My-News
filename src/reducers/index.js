import { combineReducers } from 'redux';
import NewsReducer from './reducer_news';
import SourcesReducer from './reducer_sources';

const rootReducer = combineReducers({
  state: (state = {}) => state,
    newsResults : NewsReducer,
    sources : SourcesReducer
});

export default rootReducer;
