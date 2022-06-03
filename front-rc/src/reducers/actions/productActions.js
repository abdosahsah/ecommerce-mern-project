import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_ERROR,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR, 
    CREATE_PRODUCT_REQUEST, 
    CREATE_PRODUCT_SUCCESS, 
    CREATE_PRODUCT_ERROR, 
} from '../types/productTypes';

export const productsApiCall = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_ERROR,
            payload: error.response.statusText
        })
    }
}

export const deleteProductAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/product/${id}`, config)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
        })

    } catch (error) {

        dispatch({
            type: DELETE_PRODUCT_ERROR,
            payload: error.response && error.response.data
                ? error.response.data.message
                : error.message
        })
    }
}

export const createProductAction = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/products/product`, product, config)

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: CREATE_PRODUCT_ERROR,
            payload: error.response && error.response.data
                ? error.response.data.message
                : error.message
        })
    }
}