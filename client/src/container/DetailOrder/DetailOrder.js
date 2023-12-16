import DetailBill from "./DetailBill/DetailBill";
import DetailUser from "./DetailUser/DetailUser";
import { getOrderCart } from "../../action/order";
import { useState , useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"
import {useParams} from 'react-router-dom';

function DetailOrder() {
    const {order, orderDetail} = useSelector(state=>state.order.orderCart)
    const {rid} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        async function getordercart(){
            const action = await getOrderCart(localStorage.getItem('iduser'), rid, localStorage.getItem("access"));
            dispatch(action)
        }
        getordercart();
    }, [dispatch])
    return ( 
        <div className="container">
            <div className="order__restaurant">
                <div className="col-lg-12">
                    <h3>Order Restaurant</h3>
                </div>
                <div className="col-lg-12">
                    <div className="order__restaurant__content">
                        <div className="row">
                            <DetailUser order={order?order:{}}/>
                            <DetailBill order={order?order:{}} orderDetail={orderDetail?orderDetail:[]}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DetailOrder;