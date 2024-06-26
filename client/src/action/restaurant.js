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
    REVIEW,
    BASE_URL

} from "./types";
import axios from "axios";

function configAuth(yourAuthToken){
    return {
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${yourAuthToken?yourAuthToken:null}`,
        }
    };
}

const config = {
    headers: {
        "Content-type": "application/json",
    }
};

export const getRestaurantHot= async()=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/restaurant-hot/`, config)
        return {
            type: RES_HOT_VIEW,
            payload: res.data.results
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const getRestaurant= async(page)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/restaurant/?page=${page}`, config);
        return {
            type: RES_VIEW,
            payload: res.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const searchRestaurant= async(page, q)=>{
    const body = JSON.stringify({q})
    try{
        const res = await axios.post(`http://${BASE_URL}/api/search-restaurant/?page=${page}`, body, config)
        return {
            type: RES_VIEW,
            payload: res.data
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
        const res = await axios.get(`http://${BASE_URL}/api/restaurant/${rid}`, config)
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
        const res = await axios.get(`http://${BASE_URL}/api/get-table/${rid}/`, config)
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
        const res = await axios.get(`http://${BASE_URL}/api/category/`, config)
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

export const listLike = async(uid, access) => {
    try{
        const res = await axios.get(`http://${BASE_URL}/api/list-like/${uid}/`, configAuth(access))
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

export const postLike = async(uid, rid, access)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/add-like/${uid}/${rid}/`, configAuth(access))
        if(res.data.success === true){
            return {
                type: POST_LIKE,
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
            payload: e
        }
    }
}

export const deleteLike = async(uid, rid, access)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/delete-like/${uid}/${rid}/`, configAuth(access))
        if(res.data.success == true){
            return {
                type: DEL_LIKE,
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

export const addReview = async(uid, rid, rating, review, access)=>{
    try{
        const res = await axios.post(`http://${BASE_URL}/api/add-review/${uid}/${rid}/`, 
        {'rating': rating, 'review': review}, configAuth(access))
        if(res.data.success == true){
            return {
                type: REVIEW,
                payload: res.data.message
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