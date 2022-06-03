import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_ERROR
} from '../reducers/types/productTypes';

const initialState = {
    loading: false,
    product: { reviews: [] },
    error: ''
}

export const productDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
                error: ''
            }

            case PRODUCT_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                product: { reviews: [] },
                error: action.payload
            } 

        default:
            return state
    }
}