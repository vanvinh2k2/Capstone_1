import { LOGIN_SUCCESS, GET_ERROR, LOGOUT } from "../action/type";
const initialState = {
    token: localStorage.getItem('token'),
    idUser: localStorage.getItem('iduser'),
    email: localStorage.getItem('email'),
    avatar: localStorage.getItem('avatar'),
    username: localStorage.getItem('username')
}

export default function (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token.access);
            localStorage.setItem('iduser', payload.id);
            localStorage.setItem('email', payload.email);
            localStorage.setItem('avatar', payload.avatar);
            localStorage.setItem('username', payload.username);
            return {
                ...state,
                token: payload.token.access,
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
        case GET_ERROR:
        default: return state;
    }
}