import { GET_ERROR,  } from "../action/types";
const initialState  = {
    order: []
}

export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_ERROR:
        default: return state
    }
}