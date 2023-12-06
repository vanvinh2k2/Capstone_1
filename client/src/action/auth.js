import axios from 'axios'
import { 
    SIGNUP_FAIL, 
    SIGNUP_SUCCESS, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    FORGET_USER, 
    GET_ERROR, 
    CHANGE_ACCOUNT,
    GET_ACCOUNT
} from './types'

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

    const config = {
        headers: {
            "Content-type": 'application/json',
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

export const logout = async(refresh) =>{
    const body = JSON.stringify({refresh})
    try{
        const res = await axios.post(`http://127.0.0.1:8000/auth/api/logout/`, body, config);
        if(res.data.success == true){
            return {
                type: LOGOUT,
                payload: res.data
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

export const get_account = (uid)=>{
    const body = JSON.stringify({uid})

}

