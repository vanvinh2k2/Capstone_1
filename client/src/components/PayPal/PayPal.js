import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'


const style = {"layout":"vertical"};


const ButtonWrapper = ({ currency, showSpinner, amount, pee, payload}) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch({
            type: 'resetOptions',
            value: {
                ...options, currency: currency
            }
        })
    }, [currency, showSpinner])

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions)=>actions.order.create({
                        purchase_units: [
                            {
                                amount: { currency_code: currency, value: amount},
                                payee: {
                                    email_address: pee, // Địa chỉ email của người nhận
                                },
                            }
                        ]
                    }).then(orderId => orderId)
                }
                onApprove={(data, actions)=>actions.order.capture().then(async(response)=>{
                    const {order, orderDetail, deposit, price, rid} = payload;
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
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                            'Authorization': `Bearer ${localStorage.getItem("access")}`
                        }
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
                    })
                    axios.post(`http://127.0.0.1:8000/api/add-order/${localStorage.getItem("iduser")}/${rid}/`, body, config)
                    .then((res) => {
                        if (res.data.success === true) {
                            const oid = res.data.data.oid;
                            axios.get(`http://127.0.0.1:8000/api/delete-order-cart/${localStorage.getItem("iduser")}/${rid}/`, config)
                            .then((res2)=>{
                                if (res2.data.success === true) {
                                    navigate(`/bill/${oid}`);
                                }
                            })
                        }
                    });
                })}
            />
        </>
    );
}

export default function PayPal({amount, pee, payload}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} pee={pee} payload={payload}/>
            </PayPalScriptProvider>
        </div>
    );
}