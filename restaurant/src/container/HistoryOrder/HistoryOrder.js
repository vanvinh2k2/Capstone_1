import {NavLink} from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryOrder } from '../../action/restaurant';

function HistoryOrder() {
    const orders = useSelector(state=>state.restaurant.orders);
    const dispatch = useDispatch();

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
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>History Order</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>History Order</p>
                </div>
                <div className="add-dish">
                    
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" class="table table-striped">
                    <thead>
                        <tr>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Oid</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Order Date</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Price</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Product Status</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Time from</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Time to</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Number People</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Deposit</b>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders? orders.map((item, index)=>{
                            return (
                                <tr role="row" class="even" key={index}>
                                    <th>
                                        <NavLink to={`/restaurant/history-detail/${item.oid}`} >{item.oid}</NavLink>
                                    </th>
                                    <td>{item.order_date.substring(0,10)}</td>
                                    <td>{item.price}$</td>
                                    <td>{item.product_status}</td>
                                    <td>{item.time_from.substring(0,5)}</td>
                                    <td class="nowrap">{item.time_to.substring(0,5)}</td>
                                    <td class="nowrap">{item.number_people}</td>
                                    <td class="nowrap">{item.deposit}$</td>
                                </tr>
                            )
                        }): ""}
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default HistoryOrder;