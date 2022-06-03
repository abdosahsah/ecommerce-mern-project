import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { usersListAction, deleteUserAction } from '../../reducers/actions/userAction';

const UsersListScreen = ({ history }) => {

    const usersList = useSelector(state => state.usersList)
    const { loading, error, users } = usersList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const deleteUser = useSelector(state => state.deleteUser)
    const { success: successDeleteUser } = deleteUser

    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(usersListAction())
        }
        else{
            history.push('/')
        }

    }, [dispatch, history, userInfo, successDeleteUser])

    const deleteUserHandler = (id) => {
        if(window.confirm('Are you sure to delete user!')) {
            dispatch(deleteUserAction(id))
        }
    }

    return (
        <Row>
            <Col sm={12}>
                <h2>Users</h2>
                {loading && <p>loading...</p>}
                {error && <p>{error}</p>}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>EDIT/DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (
                            users.map(user => {
                                return (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <button type="button" className="btn btn-warning mx-2">
                                                    <i className='fas fa-edit'></i>
                                                </button>
                                            </LinkContainer>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteUserHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </Col>
        </Row>
    )
}

export default UsersListScreen
