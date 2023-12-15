import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    FORGET_USER,
    REFRESH_SUCCESS
} from '../action/types';

const initialState = {
    refresh: localStorage.getItem('refresh'),
    access: localStorage.getItem('access'),
    idUser: localStorage.getItem('iduser'),
    email: localStorage.getItem('email'),
    avatar: localStorage.getItem('avatar'),
    username: localStorage.getItem('username')
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('refresh', payload.token.refresh);
            localStorage.setItem('access', payload.token.access);
            localStorage.setItem('iduser', payload.id);
            localStorage.setItem('email', payload.email);
            localStorage.setItem('avatar', payload.avatar);
            localStorage.setItem('username', payload.username);
            return {
                ...state,
                refresh: payload.token.refresh,
                access: payload.token.access,
                idUser: payload.id,
                email: payload.email,
                avatar: payload.avatar,
                username: payload.username
            }
        case SIGNUP_SUCCESS:
            localStorage.setItem('refresh', payload.token.refresh);
            localStorage.setItem('access', payload.token.access);
            localStorage.setItem('iduser', payload.id);
            localStorage.setItem('email', payload.email);
            localStorage.setItem('avatar', payload.avatar);
            localStorage.setItem('username', payload.username);
            return {
                ...state,
                refresh: payload.token.refresh,
                access: payload.token.access,
                idUser: payload.id,
                email: payload.email,
                avatar: payload.avatar,
                username: payload.username
            }
        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                access: payload.access,
            }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('refresh');
            localStorage.removeItem('access');
            localStorage.removeItem('iduser');
            localStorage.removeItem('email');
            localStorage.removeItem('avatar');
            localStorage.removeItem('username');
            return {
                ...state,
                refresh: null,
                access: null,
                idUser: null,
                email: null,
                avatar: null,
                username: null
            }
        case FORGET_USER:
        default:
            return state
    }
}