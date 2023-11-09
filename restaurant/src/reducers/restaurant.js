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
    MANAGE_ORDER,
    DETAIL_TABLE,
    DETAIL_DISH,
} from "../action/type";
const initialState = {
    reviews: [],
    orders: [],
    dishes: [],
    tables: [],
    order: [],
    category: [],
    display_order: [],
    table: {},
    dish: {},
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
        case MANAGE_ORDER:
            return {
                ...state,
                display_order: payload,
            }
        case DETAIL_TABLE:
            return {
                ...state,
                table: payload,
            }
        case DETAIL_DISH:
            return {
                ...state,
                dish: payload,
            }
        case GET_ERROR:
        default: return state;
    }
}