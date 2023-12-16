import { CHANGE_ACCOUNT, GET_DASHBOARD, GET_ACCOUNT, GET_ERROR } from "../action/types";

const initalState = {
    account: {},
    dashboard: {},
}

export default function(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case CHANGE_ACCOUNT:
            localStorage.setItem('avatar', payload.avatar)
            return{
                ...state,
                account : payload
            }
        case GET_DASHBOARD:
            return{
                ...state,
                dashboard : payload
            }
        case GET_ACCOUNT:
            return{
                ...state,
                account : payload
            }
        case GET_ERROR:
        default: return state;
    }
}