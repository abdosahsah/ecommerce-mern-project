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
    CREATE_PRODUCT_RESET
} from '../reducers/types/productTypes';

const initialState = {
    loading: false,
    products: [],
    error: ''
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: ''
            }

        case PRODUCT_LIST_ERROR:
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payload
            }

        default:
            return state
    }
}

export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case DELETE_PRODUCT_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload
            }

        case CREATE_PRODUCT_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case CREATE_PRODUCT_RESET:
            return {}

        default:
            return state
    }
}