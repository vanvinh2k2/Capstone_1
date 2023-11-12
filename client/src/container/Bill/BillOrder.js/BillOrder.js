import { useState, useEffect } from "react";
function BillOrder(props) {
  const orderItems = props.orderItems;
  const order = props.order;
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    if(order){
      setTotal(order.price - order.deposit);
    }
  },[order])
    return ( 
        <div className="row">
            <h3 className="">Information of the Dishes</h3>
            <div className="col-lg-12 col-sm-12 col-md-12">
                <div className="content-payment">
                <table>
                  <thead>
                    <tr>
                      <th className="payment-title">Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems && orderItems.length>0? orderItems.map((item, index)=>{
                      return (
                        <tr key={index}>
                          <td className="payment-title">
                            <p>{item.dish.title}</p>
                          </td>
                          <td className="payment-price"><span>{item.dish.price}</span></td>
                          <td className="payment-quantity"><span>{item.quantity}</span></td>
                          <td className="payment-amount"><span>{item.total}</span></td>
                        </tr>
                      )
                    })
                    :""}
                    <tr>
                      <td className="title-payment" colSpan="3">
                        <span>SubTotal</span>
                      </td>
                      <td className="payment-subtotal"><span>{order?order.price:""}$</span></td>
                    </tr>
                    <tr>
                      <td className="title-payment" colSpan="3">
                        <span>Diposited</span>
                      </td>
                      <td className="payment-tax"><span>{order?order.deposit:""}$</span></td>
                    </tr>
                    <tr>
                      <td className="title-payment" colSpan="3">
                        <span>Grand Total</span>
                      </td>
                      <td className="payment-total"><span>{total}$</span></td>
                    </tr>
                  </tbody>
                </table>
                </div>
            </div>
        </div>
     );
}

export default BillOrder;