import {
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL, 
    MY_ORDERS_REQUEST, 
    MY_ORDERS_SUCCESS, 
    MY_ORDERS_FAIL, 
    ORDERS_LIST_REQUEST, 
    ORDERS_LIST_SUCCESS, 
    ORDERS_LIST_FAIL
} from '../types/orderTypes';

import axios from 'axios';


export const newOrderAction = (order) => async(dispatch, getState) => {

    try {

        dispatch({
            type: NEW_ORDER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post('/api/orders', order, config)

        dispatch({
            type: NEW_ORDER_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: NEW_ORDER_FAIL,
            payload: error.response && error.response.data
            ? error.response.data.message
            : error.message
        })
    }
}

export const orderDetailsAction = (id) => async(dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data
            ? error.response.data.message
            : error.message
        })
    }
}

export const orderPayAction = (id, paymentResult) => async(dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/orders/${id}/payment`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data
            ? error.response.data.message
            : error.message
        })
    }
}

export const myOrdersAction = () => async(dispatch, getState) => {

    try {

        dispatch({
            type: MY_ORDERS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response && error.response.data
            ? error.response.data.message
            : error.message
        })
    }
}

export const ordersListAction = () => async(dispatch, getState) => {

    try {

        dispatch({
            type: ORDERS_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/orders/orderslist`, config)

        dispatch({
            type: ORDERS_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDERS_LIST_FAIL,
            payload: error.response && error.response.data
            ? error.response.data.message
            : error.message
        })
    }
}