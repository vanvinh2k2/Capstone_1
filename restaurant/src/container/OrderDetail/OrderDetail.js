import {NavLink} from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryDetail } from '../../action/restaurant';
import { useParams } from 'react-router-dom'

function OrderDetail() {
    const {order, orderItems} = useSelector(state=>state.restaurant.order);
    const dispatch = useDispatch();
    const {oid} = useParams();

    useEffect(()=>{
        async function gethistoryDetails(){
            const action  = await getHistoryDetail(oid)
            console.log(action);
            dispatch(action);
        }
        gethistoryDetails();
    }, [])

    return ( 
        <div>
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>Dashboard</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p><NavLink to="/restaurant">Dashboard</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>Order Detail</p>
                </div>
            </nav>
            <div className="add-OrderDetail">
                        <div className='row'>
                            <div className='col-lg-5'>
                            <div className="user card">
                            <h3>Information of User</h3>
                            <div className="separate"></div>
                            <div className="content">
                                <div className="item">
                                    <p className="item__title">Name User : </p>
                                    <p className="item__content">{order?order.user.username:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Phone : </p>
                                    <p className="item__content">{order?order.phone:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Email : </p>
                                    <p className="item__content">{order?order.user.email:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Date Order : </p>
                                    <p className="item__content">{order?order.order_date.substring(0,10):""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Time : </p>
                                    <p className="item__content">{order?order.time_from.substring(0,5):""} - {order?order.time_to.substring(0,5):""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Number of People : </p>
                                    <p className="item__content">{order?order.number_people:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Table : </p>
                                    <p className="item__content">{order?order.table.title:""}</p>
                                </div>
                            </div>
                        </div>
                            </div>
                            <div className='col-lg-7'>
                            <div className="content-payment card">
                                <h3>Information of Order</h3>
                                <table className='table'>
                                <thead>
                                    <tr>
                                    <th className="payment-title">Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems? orderItems.map((item, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td className="payment-title">
                                                    <p>{item.item}</p>
                                                </td>
                                                <td className="payment-price"><span>{item.price}$</span></td>
                                                <td className="payment-quantity"><span>{item.quantity}</span></td>
                                                <td className="payment-amount"><span>{item.total}$</span></td>
                                            </tr>
                                        )
                                    })
                                    :""}
                                        
                                    <tr>
                                    <td className="title-payment" colSpan="3">
                                        <span>SubTotal</span>
                                    </td>
                                    <td className="payment-subtotal"><span>{order?order.price:0}$</span></td>
                                    </tr>
                                    <tr>
                                    <td className="title-payment" colSpan="3">
                                        <span>Diposited</span>
                                    </td>
                                    <td className="payment-tax"><span>{order?order.deposit:0}$</span></td>
                                    </tr>
                                    <tr>
                                    <td className="title-payment" colSpan="3">
                                        <span>Grand Total</span>
                                    </td>
                                    <td className="payment-total"><span>{order?(order.price-order.deposit):0}$</span></td>
                                    </tr>
                                </tbody>
                                </table>
                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-sm-3 text-left" for="id_category">
                                            <b>Status Order</b>
                                        </label>
                                        <div class="col-sm-7">
                                            <div class="related-widget-wrapper" data-model-ref="category">
                                                <select className="input" name="category">
                                                    <option value="" selected="">---------</option>
                                                    <option value="1">Confirm</option>
                                                    <option value="2">Cancel</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
     );
}

export default OrderDetail;