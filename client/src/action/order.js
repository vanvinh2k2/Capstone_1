import { 
    GET_ORDER, 
    ADD_ORDER, 
    UPDATE_ORDER, 
    DELETE_ORDER,
    ADD_CLIENT
} from "./types";

export const addOrder = (order)=>{
    return {
        type: ADD_ORDER,
        payload: order
    }
}

export const updateOrder = (order)=>{
    return {
        type: UPDATE_ORDER,
        payload: order
    }
}

export const deleteOrder = (order)=>{
    return {
        type: DELETE_ORDER,
        payload: order
    }
}

export const addClient = (client)=>{
    return {
        type: ADD_CLIENT,
        payload: client
    }
}