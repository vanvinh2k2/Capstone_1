import { 
    RES_VIEW, 
    RES_HOT_VIEW, 
    POST_LIKE , 
    LIST_LIKE, 
    GET_ERROR,
    RES_DETAIL,
    GET_TABLE,
    GET_CATEGORY,
    DEL_LIKE
} from '../action/types'

const initialState = {
    restaurant_hot: [],
    restaurant: {},
    restaurant_detail: {},
    tables: [],
    categorys: [],
    likes: [],
};

export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case RES_HOT_VIEW:
            return {
                ...state,
                restaurant_hot: payload
            }
        case RES_VIEW:
            return {
                ...state,
                restaurant: payload
            }
        case RES_DETAIL:
            return {
                ...state,
                restaurant_detail: payload
            }
        case GET_TABLE:
            return {
                ...state,
                tables: payload
            }
        case GET_CATEGORY:
            return {
                ...state,
                categorys: payload
            }
        case LIST_LIKE:
            return {
                ...state,
                likes: payload
            }
        case POST_LIKE:
            return {
                ...state,
                likes: payload
            }
        case DEL_LIKE:
            return {
                ...state,
                likes: payload
            }
        default:
            return state
    }
}

