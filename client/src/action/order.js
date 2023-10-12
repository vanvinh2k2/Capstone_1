import { json } from "react-router-dom";
import { 
    GET_ORDER_CART, 
    ADD_ORDER_CART, 
    UPDATE_ORDER_CART, 
    // DELETE_ORDER,
    // ADD_CLIENT,
    GET_ERROR
} from "./types";
import axios from "axios";

const config = {
    headers: {
        "Content-type": "application/json",
    }
}

export const getOrderCart= async(uid, rid)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/order-cart/${uid}/${rid}/`, config)
        if(res.data.success == true){
            return {
                type: GET_ORDER_CART,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ORDER_CART,
                payload: []
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const addOrderCart = async(orderUser, items, uid, rid)=>{
    const {full_name, phone, tid, time_from, time_to, number_people} = orderUser
    const body = JSON.stringify({full_name, phone, tid, time_from, time_to, number_people, items});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/add-order-cart/${uid}/${rid}/`, body, config)
        if(res.data.success == true){
            return {
                type: ADD_ORDER_CART,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: []
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const updateOrderCart = async(orderUser, items, uid, rid)=>{
    const {full_name, phone, tid, time_from, time_to, number_people} = orderUser
    const body = JSON.stringify({full_name, phone, tid, time_from, time_to, number_people, items});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/update-order-cart/${uid}/${rid}/`, body, config)
        if(res.data.success == true){
            return {
                type: UPDATE_ORDER_CART,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: []
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

// export const deleteOrder = (order)=>{
//     return {
//         type: DELETE_ORDER,
//         payload: order
//     }
// }

// export const addClient = (client)=>{
//     return {
//         type: ADD_CLIENT,
//         payload: client
//     }
// }