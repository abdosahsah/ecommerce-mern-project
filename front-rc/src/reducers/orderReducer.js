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
    ORDER_PAY_RESET,
    MY_ORDERS_REQUEST, 
    MY_ORDERS_SUCCESS, 
    MY_ORDERS_FAIL,
    ORDERS_LIST_REQUEST, 
    ORDERS_LIST_SUCCESS, 
    ORDERS_LIST_FAIL
} from './types/orderTypes';

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_ORDER_REQUEST:
            return {
                loading: true
            }

        case NEW_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case NEW_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const ordersListReducer = (state = { }, action) => {
    switch (action.type) {
        case ORDERS_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDERS_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ORDERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}