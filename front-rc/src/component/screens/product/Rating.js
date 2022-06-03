import React, { Fragment } from 'react';
import propTypes from 'prop-types';

const Rating = ({ stars, numbRating, color }) => {
    return (
        <Fragment>

            <span>
                <i style={{color}}
                className={
                    stars >= 1
                    ? 'fas fa-star'
                    : stars >= 0.5
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'}></i>
            </span>
            
            <span>
                <i style={{color}}
                className={
                    stars >= 2
                    ? 'fas fa-star'
                    : stars >= 1.5
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'}></i>
            </span>

            <span>
                <i style={{color}}
                className={
                    stars >= 3
                    ? 'fas fa-star'
                    : stars >= 2.5
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'}></i>
            </span>

            <span>
                <i style={{color}}
                className={
                    stars >= 4
                    ? 'fas fa-star'
                    : stars >= 3.5
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'}></i>
            </span>

            <span>
                <i style={{color}}
                className={
                    stars >= 5
                    ? 'fas fa-star'
                    : stars >= 4.5
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'}></i>
            </span>

            <span>{numbRating && numbRating}</span>

        </Fragment>
    )
}

Rating.propTypes = {
    stars: propTypes.number.isRequired,
    numbRating: propTypes.string.isRequired,
    color: propTypes.string.isRequired
}

export default Rating
