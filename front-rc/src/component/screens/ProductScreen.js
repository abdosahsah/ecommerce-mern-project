import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Rating from '../screens/product/Rating';
import { productsDetailsApiCall } from '../../reducers/actions/productDetailsAction';
import { useDispatch, useSelector } from 'react-redux';

const ProductScreen = ({ match, history }) => {

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const { loading, product, error } = productDetails

    const [quantity, setQuantity] = useState(1)

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }

    useEffect(() => {
        dispatch(productsDetailsApiCall(match.params.id))
    }, [dispatch, match])


    return (
        <div>
            <Link to="/" className="btn btn-outline-dark mx-2 my-1">Go Back</Link>

            {loading
                ? <p>Loading...</p>
                : error
                    ? <p>{error}</p> : <Row>

                        <Col md={6} className="p-2">
                            <img src={product.image} className="img-thumbnail" alt={product.name} />
                        </Col>

                        <Col md={3} className="p-3">

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><h4>{product.name}</h4></li>

                                <li className="list-group-item">
                                    <Rating stars={product.rating}
                                        numbRating={` (${product.numReviews} reviews)`}
                                        color='#ffcd3c' />
                                </li>

                                <li className="list-group-item">
                                    <h5>${product.price}</h5>
                                </li>

                                <li className="list-group-item">
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </Col>

                        <Col md={3} className="p-3">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Row>
                                        <Col><p>Price: </p></Col>
                                        <Col><p>${product.price}</p></Col>
                                    </Row>
                                </li>

                                <li className="list-group-item">
                                    <Row>
                                        <Col><p>Status: </p></Col>
                                        <Col><p>{product.countInStock >= 1 ? 'In stock' : 'Out of stock'}</p></Col>
                                    </Row>
                                </li>

                                {product.countInStock > 0 && (
                                <li className="list-group-item">
                                    <Row>
                                        <Col><p>Quantity: </p></Col>
                                        <Col>
                                        <select  value={quantity} onChange={e => setQuantity(e.target.value)} className="form-select">
                                            { 
                                            [...Array(product.countInStock).keys()].map((x) => {
                                                return (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                )
                                            })
                                             }
                                        </select>
                                        </Col>
                                    </Row>
                                </li>)}

                                <li className="list-group-item align-items-center">
                                    <button 
                                    onClick={addToCartHandler}
                                    type="button" 
                                    className="btn btn-dark add-to-cart" 
                                    disabled={product.countInStock === 0}>Add To Cart</button>
                                </li>
                            </ul>
                        </Col>
                    </Row>}

        </div>
    )
}

export default ProductScreen
