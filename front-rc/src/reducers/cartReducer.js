import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_ADDRESS_CART,
    SAVE_PAYMENT_METHOD_CART
} from './types/cartTypes';


export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload

            const existItem = state.cartItems.find(x => x.productId === item.productId)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.productId === item.productId ? item : x)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_FROM_CART:

            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.productId !== action.payload)
            }

        case SAVE_SHIPPING_ADDRESS_CART:

            return {
                ...state,
                shippingAddress: action.payload
            }

        case SAVE_PAYMENT_METHOD_CART:

            return {
                ...state,
                paymentMethod: action.payload
            }

        default:
            return state
    }
}
