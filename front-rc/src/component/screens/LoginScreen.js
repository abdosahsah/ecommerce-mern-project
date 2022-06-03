import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction } from '../../reducers/actions/userAction';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const { loading, userInfo, error } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userLoginAction(email, password))
    }

    return (
        <div>
            <Row className="justify-content-center">
                <Col xs={12} md={5}>

                    <h2 className="mt-2">Sign-In</h2>
                    {error && (<div className="alert alert-dismissible alert-secondary" role="alert">{error}</div>)}
                    {loading && (<div>loading...</div>)}
                    <form onSubmit={submitHandler}>

                        <div className="mb-3">
                            <label htmlFor="email1" className="form-label">Email address</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="email1" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password1" className="form-label">Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="password1" />
                        </div>

                        <button type="submit" className="btn btn-dark add-to-cart">Login</button>

                    </form>

                </Col>
            </Row>
            <Row className="justify-content-center py-3">
                <Col xs={12} md={5}>
                    <p>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Create an account</Link></p>
                </Col>
            </Row>
        </div>
    )
}

export default LoginScreen