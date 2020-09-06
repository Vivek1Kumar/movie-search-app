/**
 * Static Navbar
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './movieReview.css';

const navBar = () => {
        return (
            <div className="topnav">
                <Link to='/'>Home</Link>
                <Link to='/favourite-movies'>Favourite</Link>
            </div>
        );
    }

export default navBar;