import {NavLink} from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryDetail, getCategory, getDishesOfRestaurant } from '../../action/restaurant';
import { useParams } from 'react-router-dom';
import { changeStatus, deleteOrderItem, updateOrderItem } from '../../action/restaurant';

function OrderDetail() {
    const {order, orderItems} = useSelector(state=>state.restaurant.order);
    const categorys = useSelector(state=>state.restaurant.category);
    const disheAll = useSelector(state=>state.restaurant.dishes_res);
    const dispatch = useDispatch();
    const [dishes, setDishes] = useState([]);
    const [quantity, setQuantity] = useState(Array.from({ length: dishes.length }, () => 1));
    const {oid} = useParams();
    const [status, setStatus] = useState("awaiting_confirmation");
    const [cid, setCid] = useState("0");

    useEffect(()=>{
        changeStatus(status, oid);
    }, [status]);

    useEffect(()=>{
        setDishes(disheAll);
    }, [disheAll]);

    useEffect(()=>{
        async function getcategory(){
            const action = await getCategory(localStorage.getItem("rid"));
            dispatch(action);
        }

        async function getDishs(){
            const action = await getDishesOfRestaurant(localStorage.getItem("rid"));
            dispatch(action);
        }

        async function gethistoryDetails(){
            const action  = await getHistoryDetail(oid)
            dispatch(action);
        }

        gethistoryDetails();
        getDishs();
        getcategory();
    }, [])

    useEffect(()=>{
        if(dishes && orderItems){
            const initialQuantity = Array.from({ length: dishes.length }, () => 1);
            for(let i=0;i<dishes.length;i++){
                for(let j=0;j<orderItems.length;j++){
                    if(dishes[i].did ===orderItems[j].did){
                        initialQuantity[i] = Number(orderItems[j].quantity);
                    }
                }
            }
            setQuantity(initialQuantity);
        }
    }, [dishes, orderItems])

    useEffect(()=>{
        setDishes([]);
        if(cid === "0"){
            let newDishes = [...disheAll];
            setDishes(newDishes);
        }else{
            let newDishes = [];
            disheAll.map((item, index)=>{
                if(item.category.cid === cid){
                    newDishes.push(item);
                    setDishes(newDishes);
                }
            })
        }
    }, [cid])


    const handelAdd = async(did, index)=>{
        const action = await updateOrderItem(oid, did, quantity[index])
        dispatch(action)
    }

    function handelQuantity(index, e){
        const newQuantity = [...quantity];
        newQuantity[index] = e.target.value;
        setQuantity(newQuantity);
    }

    async function handelDelete(did){
        const action = await deleteOrderItem(oid, did)
        dispatch(action)
    }

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
                        <div className="order__restaurant__dish card">
                            <h3>The Dishes</h3>
                            <div className="order__restaurant__dish__detail">
                                <div className="item">
                                    <select onChange={e=>setCid(e.target.value)}>
                                        <option value="0">All the Dishes</option>
                                        {categorys?categorys.map((category, index)=>{
                                            return (
                                                <option value={category.cid} key={index}>{category.title}</option>
                                            )
                                        }):""}
                                    </select>
                                    <div className="search">
                                        <input type="text" placeholder="Search the dish ..."/>
                                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                                    </div> 
                                </div>
                                <div className="order__restaurant__dish__detail__content">
                                    {dishes.map((dish, index)=>{
                                        return (
                                            <div className="order__restaurant__dish__detail__item" key={index}>
                                                <img src={`${dish.image}`}/>
                                                <div className="detail__item__title">
                                                    <h3>{dish.title}</h3>
                                                </div>
                                                <input type="number" value={quantity[index]} id-dish={dish.did} min="1" onChange={(e)=>handelQuantity(index, e)}/>
                                                <p>{dish.price}</p>
                                                <button><i className="fa-solid fa-plus" onClick={()=>handelAdd(dish.did, index)}></i></button>
                                            </div>
                                        )
                                    })}
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems? orderItems.map((item, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td className="payment-title"><p>{item.dish.title}</p></td>
                                                <td className="payment-price"><span>{item.dish.price}$</span></td>
                                                <td className="payment-quantity"><span>{item.quantity}</span></td>
                                                <td className="payment-amount"><span>{item.total}$</span></td>
                                                <td>
                                                    <i className="fas fa-trash" style={{cursor: "pointer"}}
                                                    onClick={()=>handelDelete(item.dish.did)}></i>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :""}  
                                    <tr>
                                        <td className="title-payment" colSpan="4"><span>SubTotal</span></td>
                                        <td className="payment-subtotal"><span>{order?order.price:0}$</span></td>
                                    </tr>
                                    <tr>
                                    <td className="title-payment" colSpan="4">
                                        <span>Diposited</span>
                                    </td>
                                    <td className="payment-tax"><span>{order?order.deposit:0}$</span></td>
                                    </tr>
                                    <tr>
                                    <td className="title-payment" colSpan="4">
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
                                            <select className="input" onClick={e=>setStatus(e.target.value)}>
                                                <option value="awaiting_confirmation">Awaiting confirmation</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="complete">Complete</option>
                                                <option value="cancel">Cancel</option>
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