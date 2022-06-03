import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_ERROR,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_ERROR,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_ERROR, 
    USER_LIST_RESET, 
    DELETE_USER_REQUEST, 
    DELETE_USER_SUCCESS, 
    DELETE_USER_ERROR, 
    USER_UPDATE_REQUEST, 
    USER_UPDATE_SUCCESS, 
    USER_UPDATE_ERROR
} from '../types/userTypes';
import axios from 'axios';


export const userLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content_Type': "application/json"
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: USER_LOGIN_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const userRegisterAction = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            headers: {
                'Content_Type': "application/json"
            }
        }

        const { data } = await axios.post('/api/users/register', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: USER_REGISTER_ERROR,
            payload: error.response && error.response.data
                ? error.response.data.message
                : error.message
        })
    }
}


export const userDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/user/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_DETAILS_ERROR,
            payload: error.response && error.response.data
                ? error.response.data.message
                : error.message
        })
    }
}


export const userUpdateAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_ERROR,
            payload: error.response && error.response.data
                ? error.response.data.message
                : error.message
        })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');

    dispatch({ type: USER_LOGOUT })

    dispatch({ type: USER_LIST_RESET })
}

export const usersListAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/userslist`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_LIST_ERROR,
            payload: error.response && error.response.data
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteUserAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/users/user/${id}`, config)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: DELETE_USER_ERROR,
            payload: error.response && error.response.data
                ? error.response.data.message
                : error.message
        })
    }
}

export const UserUpdateByAdminAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/user/${user._id}`, user, config)

        dispatch({ type: USER_UPDATE_SUCCESS })

        dispatch({ 
            type: USER_DETAILS_SUCCESS, 
            payload: data })

    } catch (error) {

        dispatch({
            type: USER_UPDATE_ERROR,
            payload: error.response && error.response.data
                ? error.response.data.message
                : error.message
        })
    }
}