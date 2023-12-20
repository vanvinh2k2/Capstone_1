import { NavLink } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryDetail } from '../../action/restaurant';
import { useParams } from 'react-router-dom';
import img from '../../assets/images/empty.png'

function HistoryDetail() {
    const {order, orderItems} = useSelector(state=>state.restaurant.order);
    const dispatch = useDispatch();
    const {oid} = useParams();
    const status = {
        "awaiting_confirmation": "Awaiting confirmation",
        "confirmed": "Confirmed",
        "complete": "Complete",
        "cancel": "Cancel"
    }

    useEffect(()=>{
        async function gethistoryDetails(){
            const action  = await getHistoryDetail(oid)
            dispatch(action);
        }
        gethistoryDetails();
    }, [])
    
    return ( 
        <div>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>History Detail</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i className="fas fa-chevron-right"></i>
                    <p><NavLink to="/restaurant/history-order">History Order</NavLink></p>
                    <i className="fas fa-chevron-right"></i>
                    <p>History Detail</p>
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
                                                    <p>{item.dish.title}</p>
                                                </td>
                                                <td className="payment-price"><span>{item.dish.price}$</span></td>
                                                <td className="payment-quantity"><span>{item.quantity}</span></td>
                                                <td className="payment-amount"><span>{item.total}$</span></td>
                                            </tr>
                                        )
                                    })
                                    :<tr role="row">
                                    <td colSpan={7} className="text-center">
                                        <img src={img}/>
                                        <h6 className="text-secondary">No data</h6>
                                    </td>
                                    </tr>}
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
                            <p className='my-2'>Status:<span className='mx-3'>{order?status[order.product_status]:""}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default HistoryDetail;