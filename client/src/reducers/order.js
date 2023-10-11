import { 
    GET_ORDER, 
    ADD_ORDER, 
    UPDATE_ORDER, 
    DELETE_ORDER, 
    GET_ERROR,
    ADD_CLIENT
} from "../action/types";
const initialState  = {
    order_dish: [],
    order_user: {},
}

export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case ADD_ORDER:
            const newOrder = { ...payload };
            return {
                ...state,
                order_dish: [...state.order_dish, newOrder]
            }
        case UPDATE_ORDER:
            const update_orders = [...state.order_dish];
            const index = update_orders.findIndex(item=>item.did === payload.did);
            update_orders[index].quantity = payload.quantity;

            return {
                ...state,
                order_dish: update_orders
            }
        case DELETE_ORDER:
            let del_orders = [...state.order_dish]
            del_orders = del_orders.filter(item=>item.did !== payload.did)
            return {
                ...state,
                order_dish: del_orders
            }
        case ADD_CLIENT:
            return {
                ...state,
                order_user: payload
            }
        case GET_ERROR:
        default: return state
    }
}