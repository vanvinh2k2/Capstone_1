import AllRestaurant from '../Home/AllRestaurant/AllRestaurant'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getOrderHistory } from '../../action/bill';

function HistoryOrder() {
    const dispatch = useDispatch();
    const orderHistory = useSelector(state=>state.bill.orderHistory);

    useEffect(()=>{
        async function getorderHistory(){
            const action = await getOrderHistory();
            dispatch(action);
        }
        getorderHistory();
    },[])
    return ( 
        <>
        <div className="container">
            <div className="row history__order">
                <div className="col-lg-12">
                    <h3>History Order</h3>
                </div>
                <div className="col-lg-12">
                    <div className="history__order__content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Orders</th>
                                    <th>Date</th>
                                    <th>Status Order</th>
                                    <th>Number People</th>
                                    <th>Total</th>
                                    <th className="torder__actions">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {console.log(orderHistory)} */}
                            {orderHistory? orderHistory.map((item, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td className="order__date"><span>{item.oid}</span></td>
                                            <td className="order__status"><span>{item.order_date.substring(0, 10)}</span></td>
                                            <td className="">{item.product_status}</td>
                                            <td className="">{item.number_people}</td>
                                            <td className="order__total"><span>{item.price}$</span></td>
                                            <td className="order__action"><a href=""><i className="fas fa-eye"></i></a></td>
                                        </tr>
                                    )
                                }):
                                (
                                    <tr>
                                        <td colSpan="6">No orders available</td>
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <AllRestaurant/>
        </>
     );
}

export default HistoryOrder;