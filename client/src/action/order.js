import { 
    GET_ORDER_CART, 
    ADD_ORDER_CART, 
    UPDATE_ORDER_CART, 
    CANCEL_ORDER,
    CHECK_ORDER,
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
    const {full_name, phone, tid, time_from, time_to, number_people, order_date} = orderUser
    const body = JSON.stringify({full_name, phone, tid, time_from, time_to, number_people, items, order_date});
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
    const {full_name, phone, tid, time_from, time_to, number_people, order_date} = orderUser
    const body = JSON.stringify({full_name, phone, tid, time_from, time_to, number_people, items,order_date});
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

export const checkOrder = async(time_to, time_from, order_date, tid, rid)=>{
    const body = JSON.stringify({time_to, time_from, order_date, tid});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/check-order/${rid}/`, body, config)
        if(res.data.success == true){
            return {
                type: CHECK_ORDER,
                payload: res.data.message
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const cancelOrder = async(oid)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/cancel-order/${oid}/`, config)
        if(res.data.success == true){
            return {
                type: CANCEL_ORDER,
                payload: res.data.message
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}