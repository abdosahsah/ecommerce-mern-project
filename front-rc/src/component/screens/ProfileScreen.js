import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDetailsAction, userUpdateAction } from '../../reducers/actions/userAction';
import { Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { myOrdersAction } from '../../reducers/actions/orderAction';

const RegisterScreen = ({ history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');


    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const { userInfo } = userLogin;

    const userDetails = useSelector(state => state.userDetails)

    const { loading, user, error } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)

    const { success } = userUpdate

    const myOrders = useSelector(state => state.myOrders)

    const { loading: loadingOrders, orders, error: errorOrders } = myOrders

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else {
            if (!user || !user.name) {
                dispatch(userDetailsAction('profile'))
                dispatch(myOrdersAction())
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, history, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Your passwords do not match')
        }
        else {
            dispatch(userUpdateAction({ _id: user._id, name, email, password }))
        }
    }

    return (
        <div>
            <Row>
                <Col md={3}>
                    <h2 className="mt-2">User Profile</h2>
                    {error && (<div className="alert alert-dismissible alert-secondary" role="alert">{error}</div>)}
                    {message && (<div className="alert alert-dismissible alert-secondary" role="alert">{message}</div>)}
                    {success && (<div className="alert alert-dismissible alert-secondary" role="alert">Account Update successfully</div>)}
                    {loading && (<div>loading...</div>)}
                    <form onSubmit={submitHandler}>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full name</label>
                            <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" className="form-control" id="name" aria-describedby="nameHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="password" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" className="form-control" id="confirmPassword" />
                        </div>

                        <button type="submit" className="btn btn-dark add-to-cart">Update</button>

                    </form>
                </Col>

                <Col md={9}>
                    <div className="alert alert-dismissible alert-light" role="alert">
                        Welcome Dear {name}
                    </div>
                    <h2>My Orders</h2>

                    {loadingOrders && <p>loading...</p>}
                    {errorOrders && <p>{errorOrders}</p>}
                    {orders && (
                        <table className="table">

                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => {
                                    return (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    order.paidAt.substring(0, 10)
                                                ) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                            </td>
                                            <td>
                                                {order.isDelivered ? (
                                                    order.deliveredAt.substring(0, 10)
                                                ) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                <button type="button" className="btn btn-light">Details</button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default RegisterScreen
