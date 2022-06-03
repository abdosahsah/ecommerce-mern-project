import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ordersListAction } from '../../reducers/actions/orderAction';

const OrdersListScreen = ({ history }) => {

    const ordersList = useSelector(state => state.ordersList)
    const { loading, error, orders } = ordersList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(ordersListAction())
        }
        else{
            history.push('/')
        }

    }, [dispatch, userInfo, history])

    return (
        <Row>
            <Col sm={12}>
                <h2>Orders</h2>
                {loading && <p>loading...</p>}
                {error && <p>{error}</p>}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && (
                            orders.map(order => {
                                return (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.email}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid
                                        ? (order.paidAt.substring(0,10)) 
                                        : (<i className="fas fa-times" style={{ color: 'red' }}></i>)}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <button type="button" className="btn btn-light">
                                                    Details
                                                </button>
                                            </LinkContainer>
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

export default OrdersListScreen
