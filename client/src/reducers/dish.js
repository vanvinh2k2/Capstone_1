import { 
    GET_ERROR, 
    GET_DISHES, 
    GET_DISH_DETAIL,
    GET_DISHES_HOT,
    GET_DISH_OF_RES,
    // GET_DISH_OF_RES_CAT,
} from "../action/types";

const initialState = {
    dishes: [],
    dishes_hot: [],
    dishes_res: [],
    dishes_res_cat: [],
    dish: {},
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
        // case GET_DISH_OF_RES_CAT:
        //     return {
        //         ...state,
        //         dishes_res_cat : payload
        //     }
        case GET_ERROR: 
        default: return state
    }
}