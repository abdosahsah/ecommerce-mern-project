import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userDetailsAction, UserUpdateByAdminAction } from '../../reducers/actions/userAction';
import { USER_UPDATE_RESET } from '../../reducers/types/userTypes';

const UserUpdateScreen = ({ history, match }) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdateByAdmin = useSelector(state => state.userUpdateByAdmin)
    const { loading: loadingEdit, error: errorEdit, success: successEdit } = userUpdateByAdmin

    const dispatch = useDispatch()

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userslist')
        }
        else{
            if (!user.name || user._id !== userId) {
                dispatch(userDetailsAction(userId))
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, history, successEdit, user, userId])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(UserUpdateByAdminAction({ _id: userId, name, email, isAdmin }))
    }

    return (
        <Row className="justify-content-center">
            <Col xs={12} md={5}>
            <Link to='/admin/userslist' className='btn btn-light my-3'>
        Go Back
      </Link>
                <h2 className="mt-Z">Update user</h2>
                {loadingEdit && <p>loading...</p>}
                {errorEdit && <p>{errorEdit}</p>}
                {loading ? <p>loading...</p> : error ? <p>{error}</p> : (
                    <form onSubmit={submitHandler}>

                        <div className="mb-3">
                            <label htmlFor="name1" className="form-label">Full name</label>
                            <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" className="form-control" id="name1" aria-describedby="nameHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email1" className="form-label">Email address</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" className="form-control" id="email1" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                        <input className="form-check-input mt-0" onChange={(e) => setIsAdmin(e.target.checked)} type="checkbox" label='Is Admin' checked={isAdmin} />
                        </div>

                        <button type="submit" className="btn btn-dark add-to-cart">Update</button>

                    </form>
                )}
            </Col>
        </Row>
    )
}

export default UserUpdateScreen
