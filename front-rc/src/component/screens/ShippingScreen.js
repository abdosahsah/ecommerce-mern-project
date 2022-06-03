import React, { useState, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { shippingAddressAction } from '../../reducers/actions/cartAction';
import CheckoutSteps from '../../component/CheckoutSteps';

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(shippingAddressAction({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <Fragment>

            <Row className="justify-content-center">

                <Col md={5}>

                <Col md={12}>
                    <CheckoutSteps step1 step2 />
                </Col>

                <h2>Shipping</h2>

                    <form onSubmit={submitHandler}>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input onChange={(e) => { setAddress(e.target.value) }} type="text" className="form-control" id="address" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input onChange={(e) => { setCity(e.target.value) }} type="text" className="form-control" id="city" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="postal-code" className="form-label">Postal code</label>
                            <input onChange={(e) => { setPostalCode(e.target.value) }} type="text" className="form-control" id="postal-code" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input onChange={(e) => { setCountry(e.target.value) }} type="text" className="form-control" id="country" required />
                        </div>

                        <button type="submit" className="btn btn-dark add-to-cart">Continue</button>

                    </form>

                </Col>
            </Row>
        </Fragment>
    )
}

export default ShippingScreen
