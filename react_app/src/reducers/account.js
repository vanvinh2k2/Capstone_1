import { CHANGE_ACCOUNT, GET_DASHBOARD } from "../action/types";

const initalState = {
    user: {},
    dashboard: {}
}

export default function(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case CHANGE_ACCOUNT:
            return{
                ...state,
                user : payload
            }
        case GET_DASHBOARD:
            return{
                ...state,
                dashboard : payload
            }
        default: return state;
    }
}