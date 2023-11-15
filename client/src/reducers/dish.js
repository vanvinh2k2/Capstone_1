import { 
    GET_ERROR, 
    GET_DISHES, 
    GET_DISH_DETAIL,
    GET_DISHES_HOT,
    GET_DISH_OF_RES,
    GET_DISH_AI,
    GET_DISH_SUGGETS
} from "../action/types";

const initialState = {
    dishes: [],
    dishes_hot: [],
    dishes_res: [],
    dishes_res_cat: [],
    dish: {},
    dishes_suggest: [],
}

export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_DISHES:
            return {
                ...state,
                dishes : payload
            } 
        case GET_DISH_DETAIL:
            return {
                ...state,
                dish : payload
            }
        case GET_DISHES_HOT:
            return {
                ...state,
                dishes_hot : payload
            }
        case GET_DISH_OF_RES:
            return {
                ...state,
                dishes_res : payload
            }
        case GET_DISH_AI:
            return {
                ...state,
                dishes : payload
            }
        case GET_DISH_SUGGETS:
            return {
                ...state,
                dishes_suggest : payload
            }
        case GET_ERROR: 
        default: return state
    }
}