import { 
    RES_VIEW, 
    RES_HOT_VIEW, 
    POST_LIKE , 
    LIST_LIKE, 
    GET_ERROR,
    RES_DETAIL,
    GET_TABLE,
    GET_CATEGORY,
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
        const res = await axios.get(`http://127.0.0.1:8000/api/list-table/${rid}/`, config)
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

export const postLike = (rid)=>{

}