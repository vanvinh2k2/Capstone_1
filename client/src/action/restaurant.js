import { 
    RES_VIEW, 
    RES_HOT_VIEW, 
    POST_LIKE , 
    LIST_LIKE, 
    GET_ERROR,
    RES_DETAIL,
    GET_TABLE,
    GET_CATEGORY,
    DEL_LIKE,
    REVIEW
} from "./types";
import axios from "axios";

const config = {
    hearders: {
        "Content-type": "application/json"
    }
}

export const getRestaurantHot= async()=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/restaurant-hot/`, config)
        return {
            type: RES_HOT_VIEW,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const getRestaurant= async()=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/restaurant/`, config)
        return {
            type: RES_VIEW,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const getRestaurantDetail= async(rid)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/restaurant/${rid}`, config)
        return {
            type: RES_DETAIL,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const getTable = async(rid) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/get-table/${rid}/`, config)
        return {
            type: GET_TABLE,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const getCategory = async() =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/category/`, config)
        return {
            type: GET_CATEGORY,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const listLike = async(uid) => {
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/list-like/${uid}/`, config)
        return {
            type: LIST_LIKE,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const postLike = async(uid, rid)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/add-like/${uid}/${rid}/`, config)
        if(res.data.success === true){
            alert(res.data.message)
            return {
                type: POST_LIKE,
                payload: res.data.data
            }
        }else{
            alert(res.data.message)
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

export const deleteLike = async(uid, rid)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/delete-like/${uid}/${rid}/`, config)
        if(res.data.success == true){
            alert(res.data.message)
            return {
                type: DEL_LIKE,
                payload: res.data.data
            }
        }else{
            alert(res.data.message)
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }  
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const addReview = async(uid, rid, rating, review)=>{
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/add-review/${uid}/${rid}/`, 
        {'rating': rating, 'review': review}, config)
        if(res.data.success == true){
            return {
                type: REVIEW,
                payload: res.data.data
            }
        }else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }  
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}