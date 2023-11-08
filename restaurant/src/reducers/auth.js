import { LOGIN_SUCCESS, GET_ERROR, LOGOUT, FRIEND_CHAT } from "../action/type";
const initialState = {
    token: localStorage.getItem('token'),
    idUser: localStorage.getItem('iduser'),
    email: localStorage.getItem('email'),
    avatar: localStorage.getItem('avatar'),
    username: localStorage.getItem('username'),
    friends: []
}

export default function (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token.refresh);
            localStorage.setItem('iduser', payload.id);
            localStorage.setItem('email', payload.email);
            localStorage.setItem('avatar', payload.avatar);
            localStorage.setItem('username', payload.username);
            return {
                ...state,
                token: payload.token.refresh,
                idUser: payload.id,
                email: payload.email,
                avatar: payload.avatar,
                username: payload.username
            }
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('iduser');
            localStorage.removeItem('email');
            localStorage.removeItem('avatar');
            localStorage.removeItem('username');
            return {
                ...state,
                token: null,
                idUser: null,
                email: null,
                avatar: null,
                username: null
            }
        case FRIEND_CHAT:
            return {
                ...state,
                friends: payload
            }
        case GET_ERROR:
        default: return state;
    }
}