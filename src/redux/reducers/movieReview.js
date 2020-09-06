import { MOVIE_REVIEW, MOVIE_DETAILS, ADD_FAVOURITE, MOVIE_REVIEW_SEARCH } from '../actions/types';

const initialState = {
  loader: false,
  movieReviews: [],
  favouriteMovies: [],
  totalPages: null,
  scrolling: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVIE_REVIEW:
      return {
        ...state,
        movieReviews: [...state.movieReviews, action.payload.results],
        scrolling: true,
        loader: true
    }
    case MOVIE_REVIEW_SEARCH:
      return {
        ...state,
        movieReviews: [action.payload.results],
        scrolling: true,
        loader: true
    }
    case MOVIE_DETAILS: {
      return {
        ...state,
        movieDetails: action.payload
      }
    }
    case ADD_FAVOURITE: {
      return {
        ...state,
        favouriteMovies: [...state.favouriteMovies, action.payload]
      }
    }
    default:
      return state;
  }
}
