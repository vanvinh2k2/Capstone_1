import { CHANGE_ACCOUNT, GET_DASHBOARD, GET_ACCOUNT, GET_ERROR } from "./types";
import axios from 'axios'
const yourAuthToken = localStorage.getItem("access");

function configAuth(yourAuthToken){
    return {
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${yourAuthToken?yourAuthToken:null}`,
        }
    };
}

function configAuth2(yourAuthToken){
    return {
        headers: {
            "Content-type": "multipart/form-data",
            'Authorization': `Bearer ${yourAuthToken?yourAuthToken:null}`,
        }
    };
}

export const change_account = async(full_name, phone, address, image, uid, accessToken) =>{
    const formData = new FormData();
    formData.append('image', image);
    formData.append('phone', phone);
    formData.append('full_name', full_name);
    formData.append('address', address);
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/edit-profile/${uid}/`, formData, configAuth2(accessToken));
        console.log(res);
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

export const get_account = async(uid, accessToken) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/get-profile/${uid}/`, configAuth(accessToken));
        console.log(res.data);
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