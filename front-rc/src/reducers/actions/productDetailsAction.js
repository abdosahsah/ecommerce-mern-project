import axios from 'axios';
import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_ERROR
} from '../types/productTypes';

export const productsDetailsApiCall = (id) =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_DETAILS_REQUEST })

            const { data } = await axios.get(`/api/products/${id}`)

            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_ERROR,
                payload: error.response.statusText
            })
        }
    }
