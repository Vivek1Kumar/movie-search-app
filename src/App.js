/**
 * App Component
 */

import React from 'react';
import { Provider } from 'react-redux';

import MovieReview from './components/movieReview';
import store from './redux/store';

import { BrowserRouter, Route } from 'react-router-dom';
import MovieDetails from './components/movieDetails';

import FavouriteMovieItems from './components/favouriteItems';
import Navbar from './components/navBar';

function App() {
  return (
    <div className="App">
      <Provider store={store} >
          <BrowserRouter>
          <Navbar />
            <Route exact path='/' component={MovieReview} />
            <Route exact path='/movie-details/:id' component={MovieDetails} />
            <Route exact path='/favourite-movies' component={FavouriteMovieItems} />
          </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

