import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { getTable, getCategory } from '../../../action/restaurant';
import { getDishesOfRestaurant } from '../../../action/dish';
import {useParams} from 'react-router-dom'
import { updateOrderCart, addOrderCart, getOrderCart } from '../../../action/order';
import { useNavigate} from 'react-router-dom'

function OrderRestaurant(props) {
    const tables = useSelector(state=>state.restaurant.tables);
    const categorys = useSelector(state=>state.restaurant.categorys);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {rid} = useParams();
    const orderCart = useSelector(state=>state.order.orderCart)
    const disheAll = useSelector(state=>state.dish.dishes_res);
    const [dishes, setDishes] = useState([]);
    const [quantity, setQuantity] = useState(Array.from({ length: dishes.length }, () => 1));
    const [stick, setStick] = useState([]);
    const [cid, setCid] = useState("0");
    const [orderItems, setOrderItems] = useState([]);
    const [orderUser, setOrderUser] = useState({
        full_name: "",
        phone: "",
        tid: "",
        time_from: "",
        time_to: "",
        number_people: ""
    })

    useEffect(()=>{
        async function getordercart(){
            const action = await getOrderCart(localStorage.getItem('iduser'), rid);
            dispatch(action)
        }
        getordercart();
    }, [dispatch])

    useEffect(()=>{
        const initialQuantity = Array.from({ length: dishes.length }, () => 1);
        const initialStick = Array.from({ length: dishes.length }, () => 0);
        // console.log("ok",orderItems)
        for(let i=0;i<dishes.length;i++){
            for(let j=0;j<orderItems.length;j++){
                if(dishes[i].did ===orderItems[j].did){
                    initialQuantity[i] = Number(orderItems[j].quantity);
                    initialStick[i] = 1;
                }
            }
        }
        
        setQuantity(initialQuantity);
        setStick(initialStick);
    }, [dishes])

    useEffect(()=>{
        async function getcategory(){
            const action = await getCategory(rid);
            dispatch(action);
        }

        async function gettable(){
            const action = await getTable(rid);
            dispatch(action);
        }

        async function getDishs(){
            const action = await getDishesOfRestaurant(rid)
            dispatch(action);
        }

        getDishs();
        gettable();
        getcategory();
    }, [])

    useEffect(()=>{
        setDishes(disheAll)
    }, [disheAll])

    useEffect(()=>{
        if (orderCart && orderCart.order){
            setOrderUser({
                ...orderUser, 
                full_name: orderCart.order.full_name,
                phone: orderCart.order.phone,
                tid: orderCart.order.table.tid,
                time_from: orderCart.order.time_from,
                time_to: orderCart.order.time_to,
                number_people: orderCart.order.number_people
            })
        }
        if (orderCart && orderCart.orderDetail && orderCart.orderDetail.length > 0) {
            // console.log(orderCart.orderDetail, dishes)
            let newOrderItems = [];
            for (let i = 0; i < dishes.length; i++) {
                for (let j = 0; j < orderCart.orderDetail.length; j++) {
                    if (dishes[i].did === orderCart.orderDetail[j].dish.did) {
                        const newOrderItem = {
                            did: dishes[i].did,
                            quantity: orderCart.orderDetail[j].quantity
                        };
                        newOrderItems.push(newOrderItem);
                    }
                }
            }
            setOrderItems(newOrderItems);
        }
    }, [orderCart])

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

    function handelChange(e){
        setOrderUser({...orderUser, [e.target.name]: e.target.value})
    }

    const handelAdd = (dish, index)=>{
        let newOrderItems = [...orderItems];
        const newOrderItem = {
            did: dish.did,
            quantity: quantity[index]
        };
        newOrderItems.push(newOrderItem);
        setOrderItems(newOrderItems);
        setStick({...stick, [index]: 1})
    }

    function handelQuantity(index, e){
        const newQuantity = [...quantity];
        newQuantity[index] = e.target.value;
        setQuantity(newQuantity);
        const did = e.currentTarget.getAttribute("id-dish");
        let newOrderItems = [...orderItems]
        for(let i=0;i<newOrderItems.length;i++){
            if(newOrderItems[i].did === did){
                newOrderItems[i].quantity = e.target.value;
                setOrderItems(newOrderItems);
            }
        }
    }

    // useEffect(()=>{
    //     console.log(quantity);
    // }, [quantity])

    const handelDelete = (dish, index)=>{
        setStick({...stick, [index]: 0})
        let delOrderItems = [...orderItems]
        delOrderItems = delOrderItems.filter(item=>item.did !== dish.did)
        setOrderItems(delOrderItems);
    }

    function checkInput(){
        if(orderItems.length<=0){
            alert("Please choice Dishes!");
            return false;
        }else
        if(orderUser.name === ""){
            alert("Please input Name!");
            return false;
        }else if(orderUser.people === ""){
            alert("Please input number of People!");
            return false;
        }else if(orderUser.phone === ""){
            alert("Please input Phone!");
            return false;
        }else if(orderUser.table === ""){
            alert("Please choice Table!");
            return false;
        }else if(orderUser.time_from === ""){
            alert("Please input time from!");
            return false;
        }else if(orderUser.time_to === ""){
            alert("Please input time to!");
            return false;
        }
        return true;
    }

    const handelSubmit = async(e)=>{
        e.preventDefault();
        if(checkInput() === true){
            if(orderCart.length<=0){
                const action = await addOrderCart(
                    orderUser, 
                    orderItems,
                    localStorage.getItem('iduser'),
                    rid
                );
                // console.log(action);
                dispatch(action)
            }else{
                // console.log(orderItems, orderUser)
                const action = await updateOrderCart(
                    orderUser, 
                    orderItems,
                    localStorage.getItem('iduser'),
                    rid
                );
                // console.log(action);
                dispatch(action)
            }
            setOrderItems([]);
            setOrderUser({});
            navigate("/detail-order/"+rid);
        }
    }

    return (
        <div className="container">
            <div className="order__restaurant">
                <div className="col-lg-12">
                    <h3>Order Restaurant</h3>
                </div>
                <div className="col-lg-12">
                    <div className="order__restaurant__content">
                        <div className="row">
                            <div className="col-lg-5 col-sm-12 col-md-12">
                                <div className="order__restaurant__table">
                                    <h3>Reserve Table</h3>
                                    <div className="item">
                                        <p>Name</p>
                                        <input type="text" value={orderUser.full_name} onChange={handelChange} name='full_name'/>
                                    </div>
                                    <div className="item">
                                        <p>Phone Number</p>
                                        <input type="text" value={orderUser.phone} onChange={handelChange} name='phone'/>
                                    </div>
                                    <div className="item">
                                        <p>Table</p>
                                        <select value={orderUser.tid} onChange={handelChange} name='tid'>
                                            <option value="0">Choice Table</option>
                                            {tables.map((table, index)=>{
                                                return(
                                                    <option value={table.tid} key={index}>{table.title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="item">
                                        <p>From </p>
                                        <input type="text" value={orderUser.time_from} onChange={handelChange} name='time_from' placeholder="7:00"/>
                                    </div>
                                    <div className="item">
                                        <p>To</p>
                                        <input type="text" value={orderUser.time_to} onChange={handelChange} name='time_to' placeholder="11:00"/>
                                    </div>
                                    <div className="item">
                                        <p>Number of People</p>
                                        <input type="text" value={orderUser.number_people} onChange={handelChange} name='number_people'/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-md-12">
                                <div className="order__restaurant__dish">
                                    <h3>The Dishes</h3>
                                    <div className="order__restaurant__dish__detail">
                                        <div className="item">
                                            <select onChange={e=>setCid(e.target.value)}>
                                                <option value="0">All the Dishes</option>
                                                {categorys.map((category, index)=>{
                                                    return (
                                                        <option value={category.cid} key={index}>{category.title}</option>
                                                    )
                                                })}
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
                                                            <span>Suggessed</span>
                                                        </div>
                                                        <input type="number" value={quantity[index]} id-dish={dish.did} min="1" onChange={(e)=>handelQuantity(index, e)}/>
                                                        <p>{dish.price}</p>
                                                        <button>
                                                            {stick[index] == 0? <i className="fa-solid fa-plus" onClick={()=>handelAdd(dish, index)}></i>
                                                            : <i className="fas fa-trash" onClick={()=>handelDelete(dish, index)}></i>}
                                                            </button>
                                                        <button className="eye"><i className="fa-solid fa-eye"></i></button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-sm-12">
                                <button className="btn" onClick={handelSubmit}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default OrderRestaurant;