import axios from 'axios';
import config from '../../config/keys_dev';

import {  GET_ERRORS, MOVIE_REVIEW, MOVIE_DETAILS, ADD_FAVOURITE, MOVIE_REVIEW_SEARCH } from './types';

export const getMovieReviews = (pageNo) => dispatch => {
	// axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=e15259d0d33bb33c11a5a0f1a89a888a&language=en-US&page=${pageNo}`)
	axios.get(`${config.api_endpoint}/3/movie/upcoming?api_key=${config.api_key}&language=en-US&page=${pageNo}`)
		.then(res=> 
			dispatch({
				type: MOVIE_REVIEW, 
				payload: res.data
			})
		).catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: {}
			})
		})
}

export const movieDetailsAction = (movie_id) => dispatch => {
	// axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=e15259d0d33bb33c11a5a0f1a89a888a&language=en-US`)
	axios.get(`${config.api_endpoint}/3/movie/${movie_id}?api_key=${config.api_key}&language=en-US`)
		.then(res=> 
			dispatch({
				type: MOVIE_DETAILS, 
				payload: res.data
			})
		).catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: {}
			})
		})
}
export const movieSearchAction = (movieName) => dispatch => {
	// axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e15259d0d33bb33c11a5a0f1a89a888a&language=en-US&page=1&include_adult=false&query=${movieName}`)
	axios.get(`${config.api_endpoint}/3/search/movie?api_key=${config.api_key}&language=en-US&page=1&include_adult=false&query=${movieName}`)
		.then(res=> 
			dispatch({
				type: MOVIE_REVIEW_SEARCH, 
				payload: res.data
			})
		).catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: {}
			})
		})
}

export const favouriteMoviesAction = (data) => dispatch => {
	dispatch({
		type: ADD_FAVOURITE,
		payload: data
	})
}