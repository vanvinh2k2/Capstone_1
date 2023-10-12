import { 
    GET_ERROR, 
    GET_DISHES, 
    GET_DISH_DETAIL, 
    GET_DISHES_HOT,
    GET_DISH_OF_RES,
    // GET_DISH_OF_RES_CAT,
} from "./types";
import axios from "axios";

const config = {
    headers: {
        "Content-type": "application/json",
    }
}

export const getDishes= async()=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/dish/`, config)
        if(res.data.success == true){
            return {
                type: GET_DISHES,
                payload: res.data.data
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const getDish= async(did)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/dish/${did}`, config)
        if(res.data.success == true){
            return {
                type: GET_DISH_DETAIL,
                payload: res.data.data
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const getDishesHot= async()=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/dish-featured/`, config)
        if(res.data.success == true){
            return {
                type: GET_DISHES_HOT,
                payload: res.data.data
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const getDishesOfRestaurant= async(rid)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/dishes-of-restaurant/${rid}/`, config)
        if(res.data.success == true){
            return {
                type: GET_DISH_OF_RES,
                payload: res.data.data
            }
        }
    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

// export const getDishesOfResCat= async(rid, cid)=>{
//     try{
//         let res;
//         if(cid !== "0"){
//             res = await axios.get(`http://127.0.0.1:8000/api/restaurant/dish-by-category/${rid}/${cid}/`, config)
//         }
//         else {
//             res = await axios.get(`http://127.0.0.1:8000/api/dishes-of-restaurant/${rid}/`, config)
//         }
//         if(res.data.success == true){
//             return {
//                 type: GET_DISH_OF_RES_CAT,
//                 payload: res.data.data
//             }
//         }
//     }catch(e){
//         return {
//             type: GET_ERROR,
//             payload: e
//         }   
//     }
// }