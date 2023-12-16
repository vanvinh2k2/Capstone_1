import {
    GET_BILL,
    GET_ERROR,
    GET_ORDER_HISTORY
 } from '../action/types';
 import axios from 'axios';

function configAuth(yourAuthToken){
    return {
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${yourAuthToken?yourAuthToken:null}`,
        }
    };
}

export const getBill = async(oid, access) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/bill-order/${oid}/`, configAuth(access))
        if(res.data.success){
            return {
                type: GET_BILL,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }
    }
    catch (e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const getOrderHistory = async(access) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/list-order/${localStorage.getItem('iduser')}/`, configAuth(access))
        if(res.data.success){
            return {
                type: GET_ORDER_HISTORY,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }
    }
    catch (e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}