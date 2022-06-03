import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap';
import { addToCartAction, removeFromCartAction } from '../../reducers/actions/cartAction'


const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const data = useSelector(state => state.cart)

    const { cartItems } = data

    useEffect(() => {

        if (productId) {

            dispatch(addToCartAction(productId, qty))
        }

    }, [dispatch, productId, qty])

    const removeItemHandler = (id) => {
        dispatch(removeFromCartAction(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0
                    ? <div className="alert alert-light" role="alert">Your cart is empty <Link to="/">Go Back</Link></div>
                    : (
                        <ul className="list-group">
                            {cartItems.map(item => {
                                return (
                                    <li key={item.productId} className="list-group-item">
                                        <Row>
                                            <Col md={2}>
                                                <img className="img-thumbnail" src={item.image} alt={item.name} />
                                            </Col>

                                            <Col md={4}>
                                                <Link to={`/product/${item.productId}`}><h6 className="mt-3">{item.name}</h6></Link>
                                            </Col>

                                            <Col md={2}>
                                                <p className="mt-3">${item.price}</p>
                                            </Col>

                                            <Col md={2}>
                                                <select
                                                    value={item.qty}
                                                    onChange={(e) => dispatch(addToCartAction(item.productId, Number(e.target.value)))}
                                                    className="form-select mt-3">
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => {
                                                            return (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </Col>

                                            <Col md={2} className="text-center">
                                                <button
                                                    onClick={() => { removeItemHandler(item.productId) }}
                                                    type="button"
                                                    className="btn btn-light mt-3"><i className="fas fa-trash"></i></button>
                                            </Col>

                                        </Row>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
            </Col>

            <Col md={4}>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <h2>Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)} Item(s)</h2>
                        <h5>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </h5>
                    </li>
                    <li className="list-group-item">
                        <button
                            type="button"
                            className="btn btn-dark add-to-cart"
                            onClick={checkoutHandler}
                            disabled={cartItems.length === 0}>
                            PROCEED TO CHECKOUT
                        </button>
                    </li>
                </ul>

            </Col>

        </Row>
    )
}

export default CartScreen
