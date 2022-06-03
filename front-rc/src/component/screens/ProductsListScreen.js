import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { productsApiCall, deleteProductAction } from '../../reducers/actions/productActions';

const ProductsListScreen = ({ history }) => {

    const productsList = useSelector(state => state.productsList)
    const { loading, error, products } = productsList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const deleteProduct = useSelector(state => state.deleteProduct)
    const { success: successDeleteProduct } = deleteProduct

    const dispatch = useDispatch()

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(productsApiCall())
        }
        else {
            history.push('/')
        }

    }, [dispatch, history, userInfo, successDeleteProduct])

    const deleteProductHandler = (id) => {
        dispatch(deleteProductAction(id))
    }

    return (
        <Row>
            <Col sm={12}>
                <h2>Products</h2>
                {loading && <p>loading...</p>}
                {error && <p>{error}</p>}

                <LinkContainer to="/admin/newproduct">
                    <button type="button" className="btn btn-dark">
                        <i className='fas fa-plus mx-2'></i>
                        Create Product
                    </button>
                </LinkContainer>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>COUNT IN STOCK</th>
                            <th>REVIEWS</th>
                            <th>EDIT/DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && (
                            products.map(product => {
                                return (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.countInStock}</td>
                                        <td>{product.numReviews}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <button type="button" className="btn btn-warning mx-2">
                                                    <i className='fas fa-edit'></i>
                                                </button>
                                            </LinkContainer>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteProductHandler(product._id)}>
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

export default ProductsListScreen
