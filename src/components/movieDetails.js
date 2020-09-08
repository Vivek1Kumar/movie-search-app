/**
 * Movie Destails page
 * movieDetailsAction @function
 * id params @Number
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { movieDetailsAction } from '../redux/actions/moiveReview';
import './movieReview.css';

class MovieDetails extends Component {
    componentDidMount() {
        this.props.movieDetailsAction(this.props.match.params.id)
    }
    render() {
        let abcImg = this.props.movies.movieDetails && this.props.movies.movieDetails.poster_path && this.props.movies.movieDetails.poster_path;
        let newData = this.props.movies.movieDetails && this.props.movies.movieDetails;

        return (
            <div className="movie-list">
                {this.props.movies.movieDetails && this.props.movies.movieDetails ?
                    <>  {newData.poster_path == null ?
                        <>
                            <div className="img-tag-details">
                                {newData.original_title}
                            </div>
                            <div>
                            <div>{newData.original_title}<span> ({newData.vote_average})</span></div>
                            <div>{newData.release_date} | {newData.popularity}</div>
                            <div>{newData.overview}</div>
                            </div>
                        </>
                        : 
                        <>
                        <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${abcImg}`} alt={newData.original_title} height="300px" width='280px' />
                        <div>
                            <div>{newData.original_title}<span> ({newData.vote_average})</span></div>
                            <div>{newData.release_date} | {newData.popularity}</div>
                            <div>{newData.overview}</div>
                        </div>
                        </>
                        }
                    </>
                    : ''
                }
            </div>
        );
    }
}
MovieDetails.propTypes = {
    movieDetailsAction: PropTypes.func.isRequired,
    movies: PropTypes.object
}

function mapStateToProps(state) {
    return {
        movies: state.movies
    };
}

export default connect(
    mapStateToProps,
    { movieDetailsAction }
)(MovieDetails);
