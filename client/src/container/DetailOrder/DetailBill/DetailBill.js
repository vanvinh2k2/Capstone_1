import { useState , useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"
import { getCategory } from "../../../action/restaurant";
import {useParams} from 'react-router-dom';
import { updateOrder, deleteOrder } from "../../../action/order";
import PayPal from "../../../components/PayPal/PayPal";

function DetailBill() {
    const order_dish = useSelector(state=>state.order.order_dish)
    const categorys = useSelector(state=>state.restaurant.categorys);
    const {rid} = useParams();
    const dispatch = useDispatch();
    const [hide, setHide] = useState([]);
    const [orderDish, setOrderDish] = useState([]);
    const [sumPrice, setSumPrice] = useState(0);

    useEffect(()=>{
        const initialHide = Array.from({ length: categorys.length }, () => 0);
        let initSumPrice = 0;
        if (order_dish && order_dish.length > 0) {
            for (const orderItem of order_dish) {
                const categoryIndex = categorys.findIndex(category => category.cid === orderItem.category);
                if (categoryIndex !== -1) {
                    initialHide[categoryIndex] = 1;
                }
            }
            for(const orderItem of order_dish){
                initSumPrice = initSumPrice + (orderItem.price*orderItem.quantity);
            }
        }
        setHide(initialHide);
        setOrderDish(order_dish);
        setSumPrice(initSumPrice);
        
    }, [categorys, order_dish])

    useEffect(()=>{
        async function getcategory(){
            const action = await getCategory(rid);
            dispatch(action);
        }
        getcategory();
    }, [])

    const handelQuantity = (e, index)=>{
        const quantity = e.target.value;
        const newOrderDish = [...orderDish];
        newOrderDish[index].quantity = quantity;
        setOrderDish(newOrderDish);
        const did = e.currentTarget.getAttribute("id-dish");
        for(let i=0;i<order_dish.length;i++){
            if(order_dish[i].did === did){
                let update = {...order_dish[i]}
                update.quantity = e.target.value;
                update.total = e.target.value * update.price;
                const action = updateOrder(update);
                dispatch(action);
            }
        }
    }

    const handelDelete = (order)=>{
        const action = deleteOrder(order);
        dispatch(action);
    }
    return ( 
        <div className="col-lg-7 col-sm-12 col-md-12">
            <div className="order__bill">
                <h3>The Orders</h3>
                <div className="order__bill__detail">
                    <div className="order__bill__detail__content">
                        {categorys.map((category, index) => (
                        <div key={index} style={{width: '100%'}}>
                            {hide[index] === 0?null
                            :<h3>{category.title}</h3>}
                            {order_dish.map((order, index2) => (
                                order.category !== category.cid? "":
                                <div className="order__bill__detail__item" key={index2}>
                                    <img src={order.image} alt={order.item} />
                                    <div className="title">
                                        <h3>{order.item}</h3>
                                        <span>Suggested</span>
                                    </div>
                                    <input type="number" value={order.quantity} min="1" id-dish={order.did} onChange={(e)=>handelQuantity(e, index2)}/>
                                    <p>{order.price}</p>
                                    <button className="eye"><i className="fas fa-trash" onClick={()=>handelDelete(order)}></i></button>
                                </div>
                            ))}
                        </div>
                        ))}
                    </div>
                </div>
                <div className="order__bill__cost">
                    <div className="order__bill__cost__price">
                        <p className="title__total">Total :</p>
                        <p className="content_total">{sumPrice}$</p>
                    </div>
                    <div className="order__bill__cost__price">
                        <p className="title__total">Deposit :</p>
                        <p className="content_total">{sumPrice*30/100}$</p>
                    </div>
                    <p><b>Note: </b>You need to pay a deposit to confirm the order</p>
                    <PayPal amount={sumPrice*30/100}/>
                </div>
            </div>
        </div>
     );
}

export default DetailBill;