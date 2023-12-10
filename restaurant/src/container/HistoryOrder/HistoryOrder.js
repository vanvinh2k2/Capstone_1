import {NavLink} from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryOrder } from '../../action/restaurant';
import img from '../../assets/images/empty.png'

function HistoryOrder() {
    const orders = useSelector(state=>state.restaurant.orders);
    const dispatch = useDispatch();
    const status = {
        "awaiting_confirmation": "Awaiting confirmation",
        "confirmed": "Confirmed",
        "cancel": "Cancel",
        "complete": "Complete"
    }

    useEffect(()=>{
        async function gethistoryOrder(){
            const action  = await getHistoryOrder(localStorage.getItem('rid'))
            dispatch(action);
        }
        gethistoryOrder();
    }, [])

    return ( 
        <div>
            <nav className='nav-header'>
                <i className="fas fa-list"></i>
                <i className="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>History Order</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i className="fas fa-chevron-right"></i>
                    <p>History Order</p>
                </div>
                <div className="add-dish">
                    
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" className="table table-striped">
                    <thead>
                        <tr>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Oid</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Order Date</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Price</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Product Status</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Time from</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Time to</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Number People</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Deposit</p>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders&&orders.length>0?orders.map((item, index)=>{
                            return (
                                <tr role="row" className="even" key={index}>
                                    <th>
                                        <NavLink to={`/restaurant/history-detail/${item.oid}`} >{item.oid}</NavLink>
                                    </th>
                                    <td>{item.order_date.substring(0,10)}</td>
                                    <td>{item.price}$</td>
                                    <td>{status[item.product_status]}</td>
                                    <td>{item.time_from.substring(0,5)}</td>
                                    <td className="nowrap">{item.time_to.substring(0,5)}</td>
                                    <td className="nowrap">{item.number_people}</td>
                                    <td className="nowrap">{item.deposit}$</td>
                                </tr>
                            )
                        }): <tr role="row">
                        <td colSpan={7} className="text-center">
                            <img src={img}/>
                            <h6 className="text-secondary">No data</h6>
                        </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default HistoryOrder;