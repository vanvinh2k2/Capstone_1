import { LOGIN_SUCCESS, GET_ERROR, LOGOUT, FRIEND_CHAT } from "../action/type";
const initialState = {
    email: localStorage.getItem('email'),
    username: localStorage.getItem('username'),
    rid: localStorage.getItem('rid'),
    title: localStorage.getItem('title'),
    image: localStorage.getItem('image'),
    friends: []
}

export default function (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('email', payload.email);
            localStorage.setItem('username', payload.username);
            localStorage.setItem('rid', payload.rid);
            localStorage.setItem('title', payload.title);
            localStorage.setItem('image', payload.image);
            return {
                ...state,
                email: payload.email,
                username: payload.username,
                rid: payload.rid,
                title: payload.title,
                image: payload.image
            }
        case LOGOUT:
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('rid');
            localStorage.removeItem('title');
            localStorage.removeItem('image');
            return {
                ...state,
                token: null,
                idUser: null,
                email: null,
                avatar: null,
                username: null,
                rid: null,
                title: null,
                image: null,
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