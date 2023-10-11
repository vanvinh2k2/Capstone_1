import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { getTable, getCategory } from '../../../action/restaurant';
import { getDishesOfResCat } from '../../../action/dish';
import {useParams} from 'react-router-dom'
import { addClient, deleteOrder, updateOrder, addOrder } from '../../../action/order';
import { useNavigate} from 'react-router-dom'

function OrderRestaurant(props) {
    const tables = useSelector(state=>state.restaurant.tables);
    const categorys = useSelector(state=>state.restaurant.categorys);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {rid} = useParams();
    const order_dish = useSelector(state=>state.order.order_dish)
    const order_user = useSelector(state=>state.order.order_user)
    const dishes = useSelector(state=>state.dish.dishes_res_cat);
    const [quantity, setQuantity] = useState(Array.from({ length: dishes.length }, () => 1));
    const [stick, setStick] = useState([]);
    const [cid, setCid] = useState("0");
    const [orderDish, setOrderDish] = useState({
        invoice_no: "",
        did: "",
        item: "",
        image: null,
        quantity: 0,
        price: 0,
        total: 0,
        category: ""
    })
    const [orderUser, setOrderUser] = useState({
        name: "",
        phone: "",
        table: "",
        time_from: "",
        time_to: "",
        people: "",
        deposit: "",
    })

    useEffect(() => {
        const initialQuantity = Array.from({ length: dishes.length }, () => 1);
        const initialStick = Array.from({ length: dishes.length }, () => 0);
        if (order_dish && order_dish.length > 0) {
            for (const orderItem of order_dish) {
                const dishIndex = dishes.findIndex(dish => dish.did === orderItem.did);
                if (dishIndex !== -1) {
                    initialQuantity[dishIndex] = Number(orderItem.quantity);
                    initialStick[dishIndex] = 1;
                }
            }
        }
        setQuantity(initialQuantity);
        setStick(initialStick);
        setOrderUser(order_user)
    }, [dishes, order_user]);

    useEffect(()=>{
        async function getDishOfCat(){
            const action = await getDishesOfResCat(rid, cid)
            dispatch(action);
        }
        getDishOfCat();    
    }, [cid])

    useEffect(()=>{
        async function getcategory(){
            const action = await getCategory(rid);
            dispatch(action);
        }

        async function gettable(){
            const action = await getTable(rid);
            dispatch(action);
        }

        gettable();
        getcategory();
    }, [])

    function handelChange(e){
        setOrderUser({...orderUser, [e.target.name]: e.target.value})
    }

    const handelAdd = (dish, index)=>{
        orderDish.did = dish.did;
        orderDish.item = dish.title;
        orderDish.image = dish.image;
        orderDish.price = dish.price;
        orderDish.category = dish.category.cid;
        orderDish.quantity = quantity[index];
        orderDish.total = dish.price * quantity[index];
        setStick({...stick, [index]: 1})
        const action = addOrder(orderDish);
        dispatch(action);
    }

    function handelQuantity(index, e){
        const newQuantity = [...quantity];
        newQuantity[index] = e.target.value;
        setQuantity(newQuantity);
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

    const handelDelete = (dish, index)=>{
        setStick({...stick, [index]: 0})
        const action = deleteOrder(dish);
        dispatch(action);
    }

    function checkInput(){
        if(order_dish.length<=0){
            alert("Please choice Dishes!");
            return false;
        }else if(orderUser.name === ""){
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

    function handelSubmit(e){
        e.preventDefault();
        if(checkInput() === true){
            const action = addClient(orderUser)
            dispatch(action);
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
                                        <input type="text" value={orderUser.name} onChange={handelChange} name='name'/>
                                    </div>
                                    <div className="item">
                                        <p>Phone Number</p>
                                        <input type="text" value={orderUser.phone} onChange={handelChange} name='phone'/>
                                    </div>
                                    <div className="item">
                                        <p>Table</p>
                                        <select value={orderUser.table} onChange={handelChange} name='table'>
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
                                        <input type="text" value={orderUser.people} onChange={handelChange} name='people'/>
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