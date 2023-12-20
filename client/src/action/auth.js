import axios from 'axios'
import { 
    SIGNUP_FAIL, 
    SIGNUP_SUCCESS, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    FORGET_USER, 
    GET_ERROR, 
    REFRESH_SUCCESS,
    TOKEN_VALID,
    CONTACT_US
} from './types';

const yourAuthToken = localStorage.getItem("access");

const config_auth = {
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${yourAuthToken?yourAuthToken:null}`,
    }
};

const config = {
    headers: {
        "Content-type": 'application/json',
    }
}

export const login = async (email, password)=>{
    const body = JSON.stringify({email, password})
    try{
        const res = await axios.post(`http://127.0.0.1:8000/auth/api/login/`, body, config)
        if(res.data.success === true){
            const result = {
                type: LOGIN_SUCCESS,
                payload: res.data.data
            }
            return result
        }
        else{
            return {
                type: LOGIN_FAIL,
                payload: res.data.message
            }
        }
        
    } catch(e){
        return {
            type: LOGIN_FAIL,
            payload: e
        }
    }
}

export const signup = async(username, email, password, password2) =>{

    if(password != password2){
        return {
            type: SIGNUP_FAIL,
            payload: "Password and Password are not same!"
        }
    }

    const body = JSON.stringify({username, email, password})
    try{
        const res = await axios.post(`http://127.0.0.1:8000/auth/api/register/`, body, config);
        // console.log(res);
        if(res.data.success == true){
            alert(res.data.message)
            return {
                type: SIGNUP_SUCCESS,
                payload: res.data.data
            }
        }
        else{
            alert(res.data.message)
            return {
                type: SIGNUP_FAIL,
                payload: res
            }
        }
    }
    catch (e){
        alert("Error!")
        return {
            type: LOGIN_FAIL,
            payload: e
        }
    }
}

export const logout = async() =>{
    try{
        return {
            type: LOGOUT,
            payload: null
        }
    }
    catch (e){
        alert("Error!")
        return {
            type: GET_ERROR,
            payload: e
        }
    }  
}

export const forget_password = async(email) =>{
    const body = JSON.stringify({email})
    try{
        const res = await axios.post(`http://127.0.0.1:8000/auth/api/send-email/`, body, config);
        if(res.data.success == true){
            alert(res.data.message)
            return {
                type: FORGET_USER,
                payload: res.data
            }
        }
        else{
            alert(res.data.message)
            return {
                type: SIGNUP_FAIL,
                payload: res.data.message
            }
        }
    }
    catch (e){
        alert("Error!")
        return {
            type: GET_ERROR,
            payload: e
        }
    }  
}


export const login_google = async(username, email, image, full_name, id) =>{
    const body = JSON.stringify({username, email, image, full_name, id})
    try{
        const res = await axios.post(`http://127.0.0.1:8000/auth/api/login/google/`, body, config);
        if(res.data.success == true){
            return {
                type: LOGIN_SUCCESS,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: res
            }
        }
    }
    catch (e){
        alert("Error!")
        return {
            type: LOGIN_FAIL,
            payload: e
        }
    }
}

export const login_facebook = async(username, email, image, full_name, id) =>{
    const body = JSON.stringify({username, email, image, full_name, id})
    try{
        const res = await axios.post(`http://127.0.0.1:8000/auth/api/login/facebook/`, body, config);
        if(res.data.success == true){
            return {
                type: LOGIN_SUCCESS,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: res
            }
        }
    }
    catch (e){
        alert("Error!")
        return {
            type: LOGIN_FAIL,
            payload: e
        }
    }
}
 

export const checkAccessToken = async(token) =>{
    const body = JSON.stringify({token})
    try{
        const res = await axios.post(`http://127.0.0.1:8000/auth/api/token/verify/`, body, config);
            return {
                type: TOKEN_VALID,
                payload: res.data
            }
    }
    catch (e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const refreshToken = async(refresh) =>{
    try {
      const res = await axios.post('http://127.0.0.1:8000/auth/api/token/refresh/', {refresh: refresh}, config_auth);
            return {
                type: REFRESH_SUCCESS,
                payload: res.data
            }
  }
  catch (e){
    return {
        type: GET_ERROR,
        payload: e
    }
}
}

export const contact_us = async(subject, message, full_name, email) =>{
    const body = JSON.stringify({subject, message, full_name, email});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/contact-us/`, body, config)
        if(res.data.success === true){
            const result = {
                type: CONTACT_US,
                payload: res.data.message
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