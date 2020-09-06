import { combineReducers } from 'redux';
import movieReducer from './movieReview';


export default combineReducers({
  movies:    movieReducer,
});
