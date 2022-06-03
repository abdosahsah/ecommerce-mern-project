import axios from 'axios';
import { 
    ADD_TO_CART, 
    REMOVE_FROM_CART, 
    SAVE_SHIPPING_ADDRESS_CART, 
    SAVE_PAYMENT_METHOD_CART } from '../types/cartTypes';

export const addToCartAction = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: ADD_TO_CART,

        payload: {
            productId: data._id,
            name: data.name,
            image:data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    const itemsToString = JSON.stringify(getState().cart.cartItems)

    localStorage.setItem('cartItems', itemsToString)

}

export const removeFromCartAction = (id) => (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })
    
    const itemsToString = JSON.stringify(getState().cart.cartItems)

    localStorage.setItem('cartItems', itemsToString)

}

export const shippingAddressAction = (data) => (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_ADDRESS_CART,
        payload: data
    })
    
    const shippingToString = JSON.stringify(data)

    localStorage.setItem('shippingAddress', shippingToString)

}

export const paymentMethodAction = (data) => (dispatch) => {

    dispatch({
        type: SAVE_PAYMENT_METHOD_CART,
        payload: data
    })
    
    const paymentToString = JSON.stringify(data)

    localStorage.setItem('paymentMethod', paymentToString)

}