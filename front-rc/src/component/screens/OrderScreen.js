import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PayPalButton  } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_PAY_RESET } from '../../reducers/types/orderTypes';
import { orderDetailsAction, orderPayAction } from '../../reducers/actions/orderAction';
import axios from 'axios';


const OrderScreen = ({ match }) => {

    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const dispatch = useDispatch()

    useEffect(() => {
        if(!order || order._id !== orderId) {
            dispatch(orderDetailsAction(orderId))
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
              setSdkReady(true)
            }
            document.body.appendChild(script)
          }

          if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(orderDetailsAction(orderId))
          } else if (!order.isPaid) {
            if (!window.paypal) {
              addPayPalScript()
            } else {
              setSdkReady(true)
            }
          }

    }, [order, orderId, dispatch, successPay]) 

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(orderPayAction(orderId, paymentResult))
      }

    return (
        loading ? <p>loading...</p> :
            error ? <div className="alert alert-dismissible alert-secondary">{error}</div>
                : <Fragment>
                    <Row className="justify-content-center">
                        <Col md={8}>

                            {!order.isPaid 
                            ? (<div className="alert alert-dismissible alert-light">
                                <h5>Order number: {order._id}</h5>
                            </div>) 
                            : (<div className="alert alert-dismissible alert-primary">
                            <h5 style={{color: "white"}}>Thank you for your order!</h5>
                            <p>Order number: {order._id}</p>
                        </div>)}

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <h5>Pyament method</h5>
                                    <p><strong>Method:</strong> {order.paymentMethod}</p>
                                </li>

                                <li className="list-group-item">
                                    <h5>Order items</h5>

                                    {order.orderItems.length === 0

                                        ? <p>Your cart is empty!</p>

                                        : (<ul className="list-group list-group-flush">
                                            {order.orderItems.map((item, index) => {
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
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </li>

                                <li className="list-group-item">
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </li>

                                <li className="list-group-item">
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </li>

                                {!order.isPaid && (
                                <li className="list-group-item">

                                    {loadingPay && <p>loading...</p>}

                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                </li>)}

                            </ul>
                        </Col>
                    </Row>
                </Fragment>
    )
}

export default OrderScreen
