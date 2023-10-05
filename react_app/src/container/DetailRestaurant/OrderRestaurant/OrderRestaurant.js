import resimg from '../../../assets/images/res.png'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { getTable, getCategory } from '../../../action/restaurant';
import { getDishesOfResCat } from '../../../action/dish';
import {useParams} from 'react-router-dom'

function OrderRestaurant(props) {
    const tables = useSelector(state=>state.restaurant.tables);
    const categorys = useSelector(state=>state.restaurant.categorys);
    const dishes = useSelector(state=>state.dish.dishes_res_cat);
    const dispatch = useDispatch();
    const {rid} = useParams();
    const [cid, setCid] = useState("0");

    useEffect(()=>{
        async function getDishOfCat(){
            console.log(rid, cid);
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
                                        <input type="text" name='name'/>
                                    </div>
                                    <div className="item">
                                        <p>Phone Number</p>
                                        <input type="text" name='phone'/>
                                    </div>
                                    <div className="item">
                                        <p>Table</p>
                                        <select>
                                            <option value="">Choice Table</option>
                                            {tables.map((table, index)=>{
                                                return(
                                                    <option value={table.tid} key={index}>{table.title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="item">
                                        <p>From </p>
                                        <input type="text" name='from' placeholder="7:00"/>
                                    </div>
                                    <div className="item">
                                        <p>To</p>
                                        <input type="text" name='to' placeholder="11:00"/>
                                    </div>
                                    <div className="item">
                                        <p>Number of People</p>
                                        <input type="text" name='people'/>
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
                                                        <input type="number" value="1" min="1"/>
                                                        <p>{dish.price}</p>
                                                        <button><i className="fa-solid fa-plus"></i></button>
                                                        <button className="eye"><i className="fa-solid fa-eye"></i></button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-sm-12">
                                <button className="btn"><a href="/detail-order">Next</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default OrderRestaurant;