import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { paymentMethodAction } from '../../reducers/actions/cartAction';
import CheckoutSteps from '../CheckoutSteps';

const PaymnetScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress.address) {
            history.push('/shipping')
        }
    })

    const [paymentMethod, setPaymentMethod] = useState("paypal")

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(paymentMethodAction(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <Row className="justify-content-center">

            <Col md={5}>

                <Col md={12}>
                    <CheckoutSteps step1 step2 step3/>
                </Col>

                <h2>Payment</h2>

                <form onSubmit={submitHandler}>

                    <h5>Chose your payment method:</h5>

                    <div className="form-check">
                        <input onChange={(e) => { setPaymentMethod(e.target.value) }} className="form-check-input" type="radio" name="paymentMethod" id="paypal" value="paypal" checked />
                        <label className="form-check-label" htmlFor="paypal">Paypal</label>
                    </div>

                    <div className="form-check">
                        <input onChange={(e) => { setPaymentMethod(e.target.value) }} className="form-check-input" type="radio" name="paymentMethod" id="stripe" value="stripe" />
                        <label className="form-check-label" htmlFor="stripe">Stripe</label>
                    </div>


                    <button type="submit" className="btn btn-dark add-to-cart mt-2">Continue</button>

                </form>

            </Col>
        </Row>
    )
}

export default PaymnetScreen
