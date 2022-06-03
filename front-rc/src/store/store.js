import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { 
    productsReducer, 
    deleteProductReducer, 
    createProductReducer } from '../reducers/productsReducer';

import { productDetailsReducer } from '../reducers/productDetailsReducer';

import { cartReducer } from '../reducers/cartReducer';
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateReducer, 
    usersListReducer, 
    deleteUserReducer, 
    userUpdateByAdminReducer} from '../reducers/userReducer';

import { 
    newOrderReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    myOrdersReducer, 
    ordersListReducer } from '../reducers/orderReducer'    

const reducers = combineReducers({
    productsList: productsReducer,
    productDetails: productDetailsReducer,
    createProduct: createProductReducer,
    deleteProduct: deleteProductReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    usersList: usersListReducer,
    userUpdateByAdmin: userUpdateByAdminReducer,
    newOrder: newOrderReducer, 
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrders: myOrdersReducer,
    ordersList: ordersListReducer,
    deleteUser: deleteUserReducer
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage },
    userLogin: { userInfo: userInfoFromLocalStorage }
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store