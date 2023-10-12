import { 
    GET_ORDER_CART, 
    ADD_ORDER_CART, 
    UPDATE_ORDER_CART, 
    // DELETE_ORDER, 
    GET_ERROR,
    // ADD_CLIENT
} from "../action/types";
const initialState  = {
    orderCart: {},
    // orderItems: [],
    // dishes_show: [],
}

export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_ORDER_CART:
            return {
                ...state,
                orderCart: payload
            }
        case ADD_ORDER_CART:
            return {
                ...state,
                orders: payload
            }
        case UPDATE_ORDER_CART:
            return {
                ...state,
                orders: payload
            }

        //     return {
        //         ...state,
        //         orders: update_orders
        //     }
        // case DELETE_ORDER:
        //     let del_orders = [...state.orders]
        //     del_orders = del_orders.filter(item=>item.did !== payload.did)
        //     return {
        //         ...state,
        //         orders: del_orders
        //     }
        // case ADD_CLIENT:
        //     return {
        //         ...state,
        //         orders: payload
        //     }
        case GET_ERROR:
        default: return state
    }
}