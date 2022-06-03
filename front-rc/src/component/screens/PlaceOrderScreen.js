import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../component/CheckoutSteps';
import { Link } from 'react-router-dom';
import { newOrderAction } from '../../reducers/actions/orderAction';

const PlaceOrderScreen = ({ history }) => {

    // Get States
    const shipping = JSON.parse(localStorage.getItem('shippingAddress'))

    const payment = JSON.parse(localStorage.getItem('paymentMethod'))

    const cart = useSelector(state => state.cart)

    // Calculate Price
    const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    const shippingPrice = itemsPrice > 100 ? 0 : 100

    const taxPrice = Number(0.15 * itemsPrice).toFixed(2)

    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

    // Place Order Button

    const newOrder = useSelector(state => state.newOrder)

    const { order, success, error } = newOrder

    const dispatch = useDispatch()

    const placeOrderHandler = () => {
        dispatch(newOrderAction({ 
            orderItems: cart.cartItems,
            shippingAddress: shipping,
            paymentMethod: payment,
            itemPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice
         }))

         console.log(order)
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [history, success])

    return (
        <Row className="justify-content-center">
            <Col md={8}>

                <CheckoutSteps step1 step2 step3 step4 />

                <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}
                        </p>
                    </li>

                    <li className="list-group-item">
                        <h2>Order Items</h2>
                        <p>
                            <strong>Payment: </strong>
                            {payment}
                        </p>
                    </li>

                    <li className="list-group-item">
                        <h2>Payment method</h2>

                        {cart.cartItems.length === 0

                            ? <p>Your cart is empty!</p>

                            : (<ul className="list-group list-group-flush">
                                {cart.cartItems.map((item, index) => {
                                    return (
                                        <li className="list-group-item" key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <img src={item.image} className="img-fluid rounded" alt={item.name} />
                                                </Col>

                                                <Col className="pt-3">
                                                    <Link to={`/product/${item.productId}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4} className="pt-3">
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </li>
                                    )
                                })}

                            </ul>)}
                    </li>

                </ul>
            </Col>
            <Col md={4}>
                <ul className="list-group">
                    <li className="list-group-item">
                        <h2>Order Summary</h2>
                    </li>

                    <li className="list-group-item">
                        <Row>
                            <Col>Items</Col>
                            <Col>{itemsPrice}</Col>
                        </Row>
                    </li>

                    <li className="list-group-item">
                        <Row>
                            <Col>Shipping</Col>
                            <Col>{shippingPrice}</Col>
                        </Row>
                    </li>

                    <li className="list-group-item">
                        <Row>
                            <Col>Tax</Col>
                            <Col>{taxPrice}</Col>
                        </Row>
                    </li>

                    <li className="list-group-item">
                        <Row>
                            <Col>Total</Col>
                            <Col>{totalPrice}</Col>
                        </Row>
                    </li>

                    <li className="list-group-item">
                    {error && <div className="alert alert-dismissible alert-secondary">{error}</div>}
                    </li>

                    <li className="list-group-item">
                    <button 
                    type="button" 
                    className="btn btn-dark add-to-cart" 
                    disabled={cart.cartItems.length === 0} 
                    onClick={placeOrderHandler}>Place Order</button>
                    </li>
                </ul>
            </Col>
        </Row>
    )
}

export default PlaceOrderScreen
