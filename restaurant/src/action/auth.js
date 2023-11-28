import { LOGIN_SUCCESS, GET_ERROR, LOGOUT, FRIEND_CHAT } from "./type";
import axios from 'axios';


const config = {
    headers: {
        "Content-type": "application/json",
    }
}

export const login = async (email, password)=>{
    const body = JSON.stringify({email, password})
    
    try{
        const res = await axios.post(`http://127.0.0.1:8000/auth/api/login/restaurant/`, body, config)
        if(res.data.success === true){
            alert(res.data.message)
            const result = {
                type: LOGIN_SUCCESS,
                payload: res.data.data
            }
            return result
        }
        else{
            alert(res.data.message)
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }
        
    } catch(e){
        alert("Error!")
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const logout = async() =>{
    return {
        type: LOGOUT,
        payload: null
    }
}

export const friend_chat = async(uid) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/friend-chat/${uid}/`, config)
        if(res.data.success === true){
            const result = {
                type: FRIEND_CHAT,
                payload: res.data.data
            }
            return result
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }
        
    } catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}