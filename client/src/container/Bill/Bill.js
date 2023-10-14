import BillOrder from "./BillOrder.js/BillOrder";
import BillUser from "./BillUser/BillUser";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getBill } from "../../action/bill";
import {useParams} from 'react-router-dom'

function Bill() {
    const bill = useSelector(state=>state.bill.bill);
    const dispatch = useDispatch();
    const {oid} = useParams();
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);

    useEffect(()=>{
        setOrder(bill.order);
        setOrderItems(bill.orderItems);
    },[bill])

    // console.log(bill, order, orderItems)

    useEffect(()=>{
        async function getbill(){
            const action = await getBill(oid);
            dispatch(action)
        }
        getbill();
    }, [])
    return ( 
        <div className="container the_bill">
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <h3 className="left"> Customer's Billing</h3>
                </div>
            </div>
            <div className="row line">
                <div className="bill">
                    <h2 className="center">The Bill of Customer</h2>
                    <BillUser order={order!==null?order:{}}/>
                    <BillOrder orderItems={orderItems!==null?orderItems:[]} order={order!==null?order:{}}/>
                </div>
            </div>
            <div className="print">
                <button className="btn">Print Bill</button>
            </div>
        </div>
     );
}

export default Bill;