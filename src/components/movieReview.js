/**
 * MovieReview list and search
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { getMovieReviews, movieSearchAction, favouriteMoviesAction } from '../redux/actions/moiveReview'
import './movieReview.css';

var arr = [];
class MovieReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: '',
            pageNo: 1,

            prevState: 1,
            favourite: []
        }
        this.searchMovies = this.searchMovies.bind(this)
        this.addFavorit = this.addFavorit.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        this.props.getMovieReviews(this.state.pageNo);
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
    }
    
    handleScroll = (e) => {
        const { scrolling, totalPages, pageNo } = this.props;
       
        if (scrolling) return;
        if(totalPages <= pageNo) return;
        const lastLi = document.querySelector('div.card, .container')
        
        if(lastLi) {
            const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
            const pageOffset  = window.pageYOffset + window.innerHeight;
    
            const bottomOffset = 20;
    
            if(pageOffset > lastLiOffset - bottomOffset) this.loadMoreItems();
        }
    }

    loadMoreItems = () => {
        this.setState(prevState => ({
            pageNo: prevState.pageNo + 1, 
            scrolling: true,
        }),
        this.props.getMovieReviews(this.state.pageNo))
    }

    dropDown(e){
        if(e.target.value !=='Dropdown') {
            this.setState({movieName: e.target.value})
            this.props.movieSearchAction(JSON.stringify((e.target.value).toLocaleLowerCase()))
        } else {
            this.setState({movieName: ''})
            this.props.getMovieReviews(this.state.pageNo);
        }
    }

    searchMovies(e) {
        if (e.target.value !== "") {
            this.setState({ [e.target.name]: e.target.value });
            if(this.state.movieName.length>1) {
                this.props.movieSearchAction(this.state.movieName.toLocaleLowerCase());
            }
        } else {
            this.setState({ movieName: '' })
            this.props.getMovieReviews(this.state.pageNo);
        }
    }

    addFavorit(id, img, title) {

        let itemList  = {
            'id': id,
            'img': img, 
            'title': title
        }
       
        let a =  arr.push(id)
        this.setState({a})
        this.props.favouriteMoviesAction(itemList)
    }
   
    render() {
        let { movieReviews, loader } = this.props.movies;
        let movieList = loader ?
            movieReviews.map((azb, i) => {
                return (
                    <Fragment key={i}>
                        {azb.length !== 0 ? azb.map((az, ind) => {
                            return (
                                    <div key={ind} className="card" >
                                        <Link to={`/movie-details/${az.id}`} >
                                            {az.poster_path == null ?
                                                <div className="img-tag">
                                                    {az.original_title}
                                                </div>
                                                : <div className="images-list">
                                                    <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${az.poster_path}`} 
                                                         alt={az.original_title} 
                                                         height="200px"
                                                         width='100%' 
                                                         title="Add your favorit" 
                                                    />
                                                </div>
                                            }
                                        </Link>
                                        <div className="container">
                                            <h4><b>{((az.original_title).length > 17 ? `${(az.original_title).slice(0, 10)} ...` : az.original_title)}</b></h4>
                                            <button className="favourite-button" 
                                                    onClick={this.addFavorit.bind(this, az.id, az.poster_path, az.original_title)}>
                                                        {arr.includes(az.id) ? 'Unfavourite' : 'Favourite'}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                            : <>{i === 0 ?<h1>Search Item is not found</h1>: ''}</>
                        }
                    </Fragment>
                )
            })
            :
            <center>
                <div>Loading...</div>
            </center>
            
        return (
            <React.Fragment>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search.."
                        name="movieName"
                        onChange={this.searchMovies}
                        value={this.state.movieName}
                    />
                    <select className='dropdown' onChange={this.dropDown.bind(this)}>
                        <option >Dropdown</option>
                        <option >All</option>
                        <option >Movies</option>
                        <option >Series</option>
                        <option >Episodes</option>
                    </select> &nbsp;
                    <button className='dropdown'>Search</button>
                </div>


                <div className="movie-list">{movieList}</div>
            </React.Fragment>
        );
    }
}
MovieReview.propTypes = {
    getMovieReviews: PropTypes.func.isRequired,
    favouriteMoviesAction: PropTypes.func.isRequired,
    push: PropTypes.func,
    movies: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        movies: state.movies
    };
}

export default connect(
    mapStateToProps,
    { getMovieReviews, movieSearchAction, favouriteMoviesAction }
)(MovieReview);
