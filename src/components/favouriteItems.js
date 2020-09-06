/**
 * Favouirte Items list 
 * favouritMovies @Object
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

class FavouriteItems extends Component {
    render() {
        let { favouriteMovies } = this.props.movies;
        return (
            <div className="movie-list">
                {favouriteMovies&& favouriteMovies.length >0 ? favouriteMovies&& favouriteMovies.map((az,i) => {
                    return (
                        <div key={i} className="card" >
                            <Link to={`/movie-details/${az.id}`} >
                                {az.img == null ?
                                    <div style={{ background: 'lightblue', height: "200px", width: '100%', textAlign: 'center', padding: '20px' }}>
                                        {az.title}
                                    </div>
                                    : <div style={{ height: "200px", width: '100%' }}>
                                        <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${az.img}`} alt="Avatar" height="200px" width='100%' title="Add your favorit" />
                                    </div>
                                }
                            </Link>
                            <div className="container">
                                <h4><b>{((az.title).length > 17 ? `${(az.title).slice(0, 10)} ...` : az.title)}</b></h4>
                                <button>Favorit</button>
                            </div>
                        </div>
                    )
                })
                :<center><h1>Favourit Item is not available</h1></center>}
            </div>
        );
    }
}
FavouriteItems.propTypes = {
    movies: PropTypes.object,
}
function mapStateToProps(state) {
    return {
        movies: state.movies
    };
}

export default connect(
    mapStateToProps,
)(FavouriteItems);