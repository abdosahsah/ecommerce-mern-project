import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from './product/Product';
import { productsApiCall } from '../../reducers/actions/productActions';

const HomeScreen = () => {

    const dispatch = useDispatch()

    const productsList = useSelector(state => state.productsList)

    const { loading, products, error } = productsList

    useEffect(() => {

        dispatch(productsApiCall())

    }, [dispatch])


    return (
        <Fragment>
            <h1>Latest Products</h1>
            <Row>
                {loading 
                ? <p>Loading...</p> 
                : error 
                ? <p>{error}</p> 
                : products.map((product, index) => {
                    return (
                        <Col sm={12} md={6} lg={4} xl={3} key={index}>
                            <Product product={product} />
                        </Col>
                    )
                })}
            </Row>
        </Fragment>
    )
}

export default HomeScreen
