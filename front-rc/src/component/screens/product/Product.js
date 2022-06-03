import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
 
const Product = ({ product }) => {
    return (
        <div className="card my-2">
            <Link to={`/product/${product._id}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h5 className="card-title text-primary">{product.name}</h5>
                </Link>
                <p>
                    <Rating 
                    stars={product.rating} 
                    numbRating={` (${product.numReviews} reviews)`} 
                    color='#ffcd3c' />
                </p>
                <h6 className="text-dark">${product.price}</h6>
            </div>
        </div>
    )
}

export default Product
