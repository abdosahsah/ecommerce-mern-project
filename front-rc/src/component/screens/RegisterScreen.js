import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAction } from '../../reducers/actions/userAction';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const { loading, userInfo, error } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Your passwords do not match')
        }
        else{
            dispatch(userRegisterAction(name, email, password))
        }
    }

    return (
        <div>
            <Row className="justify-content-center">
                <Col xs={12} md={5}>

                    <h2 className="mt-2">Sign-Up</h2>
                    {error && (<div className="alert alert-dismissible alert-secondary" role="alert">{error}</div>)}
                    {message && (<div className="alert alert-dismissible alert-secondary" role="alert">{message}</div>)}
                    {loading && (<div>loading...</div>)}
                    <form onSubmit={submitHandler}>

                        <div className="mb-3">
                            <label htmlFor="name1" className="form-label">Full name</label>
                            <input onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" id="name1" aria-describedby="nameHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email1" className="form-label">Email address</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="email1" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password1" className="form-label">Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="password1" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword1" className="form-label">Confirm Password</label>
                            <input onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" className="form-control" id="confirmPassword1" />
                        </div>

                        <button type="submit" className="btn btn-dark add-to-cart">Login</button>

                    </form>

                </Col>
            </Row>
            <Row className="justify-content-center py-3">
                <Col xs={12} md={5}>
                    <p>You have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link></p>
                </Col>
            </Row>
        </div>
    )
}

export default RegisterScreen
