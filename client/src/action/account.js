import { CHANGE_ACCOUNT, GET_DASHBOARD, GET_ACCOUNT, GET_ERROR } from "./types";
import axios from 'axios'

const config = {
    headers:{
        "Content-type": "application/json",
    }
}

const config2 = {
    headers:{
        'Content-Type': 'multipart/form-data'
    }
}

export const change_account = async(full_name, phone, address, image, uid) =>{
    const formData = new FormData();
    formData.append('image', image);
    formData.append('phone', phone);
    formData.append('full_name', full_name);
    formData.append('address', address);
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/edit-profile/${uid}/`, formData, config2);
        if(res.data.success === true){
            return {
                type: CHANGE_ACCOUNT,
                payload: res.data.data
            }
        }else{
            return {
                type: GET_ERROR,
                payload: "ERROR!"
            }
        }
    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const get_account = async(uid) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/get-profile/${uid}/`, config);
        if(res.data.success === true){
            return {
                type: GET_ACCOUNT,
                payload: res.data.data
            }
        }else{
            return {
                type: GET_ERROR,
                payload: "ERROR!"
            }
        }
    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}