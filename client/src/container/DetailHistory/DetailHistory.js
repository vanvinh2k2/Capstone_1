import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBill } from '../../action/bill';
import { useParams } from 'react-router-dom';
import { cancelOrder } from "../../action/order";
import { addReview } from "../../action/restaurant";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DetailHistory() {
    const {order, orderItems} = useSelector(state=>state.bill.bill);
    const dispatch = useDispatch();
    const status = {
        "awaiting_confirmation": "Awaiting confirmation",
        "confirmed": "Confirmed",
        "complete": "Complete",
        "cancel": "Cancel"
    }
    const {oid} = useParams();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(5);

    useEffect(()=>{
        async function gethistoryDetails(){
            const action  = await getBill(oid);
            dispatch(action);
        }
        gethistoryDetails();
    }, [])

    async function handleCancel(){
        const action = await cancelOrder(oid);
        toast.info(action.payload);
        window.location.reload();
    }

    async function handelReview(){
        if(review !== ""){
            const action = await addReview(
                localStorage.getItem("iduser"), 
                order.restaurant.rid, 
                rating, 
                review
            );
            toast.success(action.payload);
            setReview("");
        }else toast.error('Please input content!');
    }

    return ( 
        <div className="container">
            <h3 style={{marginTop: "20px"}}>Detail History Order</h3>
            <div className="add-OrderDetail">
                <div className='row'>
                    <div className='col-lg-5'>
                        <div className="user card">
                            <h3 style={{marginBottom: "15px"}}>Information of User</h3>
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
                                    <p className="item__title">Table :</p>
                                    <p className="item__content">{order?order.table.title:""}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-7'>
                    <div className="content-payment card">
                        <h3 style={{marginBottom: "15px"}}>Information of Order</h3>
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
                            :""}
                            <tr>
                            <td className="title-payment" colSpan="3">
                                <span>SubTotal</span>
                            </td>
                            <td className="payment-subtotal"><span>
                                {order?order.price:0}$
                                </span></td>
                            </tr>
                            <tr>
                            <td className="title-payment" colSpan="3">
                                <span>Diposited</span>
                            </td>
                            <td className="payment-tax"><span>
                                {order?order.deposit:0}$
                                </span></td>
                            </tr>
                            <tr>
                            <td className="title-payment" colSpan="3">
                                <span>Grand Total</span>
                            </td>
                            <td className="payment-total"><span>
                                {order?(order.price-order.deposit):0}$
                                </span></td>
                            </tr>
                        </tbody>
                        </table>
                        <div class="form-group">
                            <div class="row">
                                <label class="text-left" style={{marginBottom: "15px"}}>
                                    <span><b style={{marginRight: "15px"}}>Status Order:</b>{order?status[order.product_status]:""}</span>
                                    {order&&order.product_status === "cancel"?<button style={{marginTop: "15px"}} className="btn-2">Cancel</button>
                                    :order&&order.product_status === "complete"?"":<button style={{marginTop: "15px"}} className="btn" onClick={handleCancel}>Cancel</button>}
                                </label>
                            </div>
                            <div className="row">
                                {order&&order.product_status === "complete"?
                                <>
                                    <h3>Review Restaurant</h3>
                                    <label class="col-sm-3 text-left" style={{marginTop: "15px"}}>Choice Review</label>
                                    <div class=" col-sm-7" field-title style={{marginTop: "15px"}}>
                                        <select style={{padding: "5px 10px"}} 
                                            onChange={e=>setRating(e.target.value)}>
                                            <option value="5">★★★★★</option>
                                            <option value="4">★★★★☆</option>
                                            <option value="3">★★★☆☆</option>
                                            <option value="2">★★☆☆☆</option>
                                            <option value="1">★☆☆☆☆</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-7" field-title style={{marginTop: "15px"}}>
                                        <textarea className="input" type="text" rows={4} 
                                        onChange={e=>setReview(e.target.value)}
                                        placeholder="Type content"
                                        value={review}
                                        style={{width: "100%", padding: "5px"}}/>
                                        <button className="btn" style={{marginBottom: "20px"}} onClick={handelReview}>Send</button>
                                    </div>
                                </>
                                :""} 
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
     );
}

export default DetailHistory;