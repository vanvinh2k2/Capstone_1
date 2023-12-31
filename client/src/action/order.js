import { 
    GET_ORDER_CART, 
    ADD_ORDER_CART, 
    UPDATE_ORDER_CART, 
    CANCEL_ORDER,
    CHECK_ORDER,
    GET_ERROR,
    ADD_ORDER_OK
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

export const getOrderCart= async(uid, rid, access)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/order-cart/${uid}/${rid}/`, configAuth(access))
        if(res.data.success == true){
            return {
                type: GET_ORDER_CART,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ORDER_CART,
                payload: []
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const addOrderCart = async(orderUser, items, uid, rid, access)=>{
    const {full_name, phone, tid, time_from, time_to, number_people, order_date} = orderUser
    const body = JSON.stringify({full_name, phone, tid, time_from, time_to, number_people, items, order_date});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/add-order-cart/${uid}/${rid}/`, body, configAuth(access))
        if(res.data.success == true){
            return {
                type: ADD_ORDER_CART,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: []
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const updateOrderCart = async(orderUser, items, uid, rid, access)=>{
    const {full_name, phone, tid, time_from, time_to, number_people, order_date} = orderUser
    const body = JSON.stringify({full_name, phone, tid, time_from, time_to, number_people, items,order_date});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/update-order-cart/${uid}/${rid}/`, body, configAuth(access))
        if(res.data.success == true){
            return {
                type: UPDATE_ORDER_CART,
                payload: res.data.data
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: []
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const checkOrder = async(time_to, time_from, order_date, tid, rid, access)=>{
    const body = JSON.stringify({time_to, time_from, order_date, tid});
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/check-order/${rid}/`, body, configAuth(access))
        if(res.data.success == true){
            return {
                type: CHECK_ORDER,
                payload: res.data.message
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const cancelOrder = async(oid, access)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/cancel-order/${oid}/`, configAuth(access))
        if(res.data.success == true){
            return {
                type: CANCEL_ORDER,
                payload: res.data.message
            }
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const addOrder = async(data, access)=>{
    const {order, orderDetail, deposit, price, rid} = data;
    const {full_name, phone, table, time_from, time_to, number_people, order_date} = order;
    let items = [];
    const tid = table.tid;
    for(let i=0; i<orderDetail.length; i++){
        let item = {
            did: "",
            quantity: 0,
            total: 0,
        }
        item.did = orderDetail[i].dish.did;
        item.quantity = orderDetail[i].quantity;
        item.total = orderDetail[i].dish.price * orderDetail[i].quantity;
        items.push(item);
    }
    const body = JSON.stringify({
        full_name, 
        phone,
        tid,
        time_from,
        time_to,
        number_people,
        deposit,
        price,
        items,
        order_date
    });
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/add-order/${localStorage.getItem("iduser")}/${rid}/`, body, configAuth(access));
        
                    
                        if (res.data.success === true) {
                            const oid = res.data.data.oid;
                            const res2 = await axios.get(`http://127.0.0.1:8000/api/delete-order-cart/${localStorage.getItem("iduser")}/${rid}/`, configAuth(access))
                            
                                if (res2.data.success === true) {
                                    return {
                                        type: ADD_ORDER_OK,
                                        payload: oid
                                    }
                                }
                                else{
                                    return {
                                        type: GET_ERROR,
                                        payload: "Error"
                                    }
                                }
                        }
        else{
            return {
                type: GET_ERROR,
                payload: "Error"
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}


