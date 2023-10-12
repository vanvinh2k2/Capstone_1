import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

const style = {"layout":"vertical"};

const ButtonWrapper = ({ currency, showSpinner, amount }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

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
                                // payee: {
                                //     email_address: 'nguoi-nhan@example.com', // Địa chỉ email của người nhận
                                // },
                            }
                        ]
                    }).then(orderId => orderId)
                }
                onApprove={(data, actions)=>actions.order.capture().then(async(response)=>{
                    console.log(response)
                })}
            />
        </>
    );
}

export default function PayPal({amount}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}