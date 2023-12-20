import { 
    GET_ERROR, 
    REVIEW_RESTAURANT ,
    ORDER_HISTORY,
    GET_TABLE,
    GET_DISHES,
    ORDER_DETAIL,
    ADD_DISH,
    DELETE_DISH,
    UPDATE_DISH,
    MANAGE_ORDER,
    ADD_TABLE,
    DELETE_TABLE,
    GET_CATEGORY,
    UPDATE_TABLE,
    DETAIL_TABLE,
    DETAIL_DISH,
    GET_DISH_OF_RES,
    CHANGE_STATUS,
    UPDATE_ORDER_ITEM,
    DELETE_ORDER_ITEM,
    RES_DETAIL,
    CHANGE_RESTAURANT
} from "../action/type";
import axios from "axios";

const config = {
    headers: {
        "Content-type": "application/json",
    }
}

const config2 = {
    headers: {
        "Content-type": "multipart/form-data",
    }
}

export const getReviews = async (rid)=>{
    const body = JSON.stringify({rid})
    
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/reviews-restaurant/${rid}/`, body, config)
        if(res.data.success === true){
            const result = {
                type: REVIEW_RESTAURANT,
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

export const getHistoryOrder = async (rid)=>{
    const body = JSON.stringify({rid})
    
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/order-restaurant/${rid}/`, body, config)
        if(res.data.success === true){
            const result = {
                type: ORDER_HISTORY,
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

export const getDishes = async (rid)=>{
    const body = JSON.stringify({rid})
    
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/dishes-of-restaurant/${rid}/`, body, config)
        if(res.data.success === true){
            const result = {
                type: GET_DISHES,
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

export const getTables = async (rid)=>{
    const body = JSON.stringify({rid})
    
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/get-table/${rid}/`, body, config)
        if(res.data.success === true){
            const result = {
                type: GET_TABLE,
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

export const getHistoryDetail = async (oid)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/bill-order/${oid}/`, config)
        if(res.data.success === true){
            const result = {
                type: ORDER_DETAIL,
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

export const addDish = async (rid, data)=>{
    const { 
        title, 
        image, 
        description, 
        price, 
        old_price, 
        product_status, 
        specifications, 
        featured, 
        digital, 
        cid 
    } = data;

    let formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('old_price', old_price);
    formData.append('product_status', product_status);
    formData.append('specifications', specifications);
    formData.append('featured', featured);
    formData.append('digital', digital);
    formData.append('cid', cid);
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/add-dish/${rid}/`, formData, config2)
        if(res.data.success === true){
            const result = {
                type: ADD_DISH,
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

export const updateDish = async(did, data) =>{
    const { 
        title, 
        image, 
        description, 
        price, 
        old_price, 
        product_status, 
        specifications, 
        featured, 
        digital, 
        cid 
    } = data;
    
    let formData = new FormData();
    if(image) formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('old_price', old_price);
    formData.append('product_status', product_status);
    formData.append('specifications', specifications);
    formData.append('featured', featured);
    formData.append('digital', digital);
    formData.append('cid', cid);
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/update-dish/${did}/`, formData, config2)
        return {
            type: UPDATE_DISH,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const addTable = async (rid, title, number_seat)=>{
    const body = JSON.stringify({title, number_seat});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/add-table/${rid}/`, body, config)
        if(res.data.success === true){
            const result = {
                type: ADD_TABLE,
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

export const deleteDish = async(rid, did) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/delete-dish/${rid}/${did}/`, config)
        return {
            type: DELETE_DISH,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const deleteTable = async(rid, tid) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/delete-table/${rid}/${tid}/`, config)
        return {
            type: DELETE_TABLE,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const manageOrder = async(rid, day, month, year) =>{
    const date = `${year}-${month}-${day}`;
    const body = JSON.stringify({date})
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/manage-order/${rid}/`, body, config)
        return {
            type: MANAGE_ORDER,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const updateTable = async(tid, title, number_seat) =>{
    const body = JSON.stringify({title, number_seat})
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/update-table/${tid}/`, body, config);
        console.log(res);
        return {
            type: UPDATE_TABLE,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const detailTable = async(tid) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/detail-table/${tid}/`, config)
        return {
            type: DETAIL_TABLE,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const detailDish= async(did)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/dish/${did}`, config)
        if(res.data.success == true){
            return {
                type: DETAIL_DISH,
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

export const updateOrderItem= async(oid, did, quantity)=>{
    const body = JSON.stringify({quantity});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/update-order-item/${oid}/${did}/`, body, config)
        if(res.data.success == true){
            return {
                type: UPDATE_ORDER_ITEM,
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

export const deleteOrderItem= async(oid, did)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/delete-order-item/${oid}/${did}/`, config)
        if(res.data.success == true){
            return {
                type: DELETE_ORDER_ITEM,
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

export const changeStatus= async(product_status, oid)=>{
    const body = JSON.stringify({product_status});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/update-status-order/${oid}/`, body, config)
        if(res.data.success == true){
            return {
                type: CHANGE_STATUS,
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

export const change_account = async(form, img, rid)=>{
    const {title, description, phone, address, time_open, time_close} = form;
    const image = img;
    const formData = new FormData();
    if(image !== null) formData.append('image', image);
    formData.append('phone', phone);
    formData.append('title', title);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('time_open', time_open);
    formData.append('time_close', time_close);

    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/change-restaurant/${rid}/`, formData, config2)
        return {
            type: CHANGE_RESTAURANT,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}