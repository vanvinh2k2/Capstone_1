import AllRestaurant from '../Home/AllRestaurant/AllRestaurant'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getOrderHistory } from '../../action/bill';
import img from '../../assets/images/empty2.png'
import { getRestaurant, searchRestaurant } from '../../action/restaurant';

function HistoryOrder({q}) {
    const dispatch = useDispatch();
    const orderHistory = useSelector(state=>state.bill.orderHistory);
    const status = {
        "awaiting_confirmation": "Awaiting confirmation",
        "confirmed": "Confirmed",
        "cancel": "Cancel",
        "complete": "Complete"
    }
    const restaurants = useSelector(state=>state.restaurant.restaurant.results)
    const num_res = useSelector(state=>state.restaurant.restaurant.count)
    const [page, setPage] = useState(1);

    useEffect(()=>{
        async function getorderHistory(){
            const action = await getOrderHistory(localStorage.getItem("access"));
            dispatch(action);
        }
        getorderHistory();
    },[]);

    useEffect(()=>{
        const fetchData = async () => {
            const action = await getRestaurant(page);
            dispatch(action);
        };

        const searchData = async () => {
            const action = await searchRestaurant(page, q);
            dispatch(action);
        };

        if(q==="") fetchData();
        else searchData();
    }, [page, q])

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
                                {orderHistory&&orderHistory.length>0?orderHistory.map((item, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td className="order__date"><span>{item.oid}</span></td>
                                                <td className="order__status"><span>{item.order_date.substring(0, 10)}</span></td>
                                                <td className="">{status[item.product_status]}</td>
                                                <td className="">{item.number_people}</td>
                                                <td className="order__total"><span>{item.price}$</span></td>
                                                <td className="order__action"><a href={`/detail-history-order/${item.oid}`}><i className="fas fa-eye"></i></a></td>
                                            </tr>
                                        )
                                    }):
                                    <tr role="row">
                                        <td colSpan={6} className="text-center">
                                            <img src={img} style={{marginTop: '50px', marginBottom: '35px'}}/>
                                            <h6 className="text-secondary" style={{marginBottom: '85px'}}>There are no history order yet</h6>
                                        </td>
                                    </tr>}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AllRestaurant
                restaurants={restaurants}
                num_res={num_res}
                page={page}
                setPage={setPage}
            />
        </>
     );
}

export default HistoryOrder;