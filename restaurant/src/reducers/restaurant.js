import { 
    GET_ERROR, 
    REVIEW_RESTAURANT,
    ORDER_HISTORY,
    GET_DISHES,
    GET_TABLE,
    ORDER_DETAIL,
    ADD_DISH,
    DELETE_DISH,
    DELETE_TABLE,
    UPDATE_DISH,
    GET_CATEGORY,
} from "../action/type";
const initialState = {
    reviews: [],
    orders: [],
    dishes: [],
    tables: [],
    order: [],
    category: [],
}

export default function (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case REVIEW_RESTAURANT:
            return {
                ...state,
                reviews: payload,
            }
        case ORDER_HISTORY:
            return {
                ...state,
                orders: payload,
            }
        case GET_DISHES:
            return {
                ...state,
                dishes: payload,
            }
        case GET_TABLE:
            return {
                ...state,
                tables: payload,
            }
        case ORDER_DETAIL:
            return {
                ...state,
                order: payload,
            }
        case GET_CATEGORY:
            return {
                ...state,
                category: payload,
            }
        case DELETE_DISH:
            return {
                ...state,
                dishes: payload,
            }
        case DELETE_TABLE:
            return {
                ...state,
                tables: payload,
            }
        case GET_ERROR:
        default: return state;
    }
}