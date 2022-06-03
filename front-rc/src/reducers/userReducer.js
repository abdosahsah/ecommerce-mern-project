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
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_ERROR,
    USER_LIST_RESET, 
    DELETE_USER_REQUEST, 
    DELETE_USER_SUCCESS, 
    DELETE_USER_ERROR, 
    USER_UPDATE_REQUEST, 
    USER_UPDATE_SUCCESS, 
    USER_UPDATE_ERROR, 
    USER_UPDATE_RESET
} from './types/userTypes';



export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }

        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case USER_LOGIN_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            }

        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case USER_REGISTER_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case USER_DETAILS_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true
            }

        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload
            }

        case USER_UPDATE_PROFILE_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}

export const usersListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {
                loading: true
            }

        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }

        case USER_LIST_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LIST_RESET:
            return {
                users: []
            }

        default:
            return state
    }
}

export const deleteUserReducer = (state = { }, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                loading: true
            }

        case DELETE_USER_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case DELETE_USER_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const userUpdateByAdminReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {
                loading: true
            }

        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case USER_UPDATE_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case USER_UPDATE_RESET:
            return { }

        default:
            return state
    }
}