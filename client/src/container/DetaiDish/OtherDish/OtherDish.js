import { getDishesOfRestaurant2 } from "../../../action/dish";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import Pagniation from '../../../components/Pagniation/Pagniation';

function OtherDish(props) {
    const rid = props.rid;
    const dishes = useSelector(state=>state.dish.dishes_res2.results);
    const num_res = useSelector(state=>state.dish.dishes_res2.count)
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        async function getdish(){
            if(rid !== null){
                const action = await getDishesOfRestaurant2(rid, page);
                dispatch(action);
            }
        }
        getdish();
    }, [rid, page])

    return ( 
        <div className="container menu__dish">
            <div className="row">
                <h3>The Other Dishes of Restaurant</h3>
            </div>
            <div className="row">
                {dishes&&dishes.map((dish, index)=>{
                    return (
                        <div className="col-lg-3 col-md-6" key={index}>
                            <div className="featured__content">
                                <div className="featured__item">
                                    <div className="featured__item__pic">
                                        <img src={`${dish.image}`}/>
                                    </div>
                                    <div className="featured__item__text">
                                        <h6><a href="#">{dish.title}</a></h6>
                                        <div className="featured__item__sale">
                                            <span>Sale: </span>
                                            <span className="featured__item__sale_1">10%</span>
                                        </div>
                                        <div className="featured__item__price">
                                            <span>Price: </span>
                                            <div>
                                                <span className="featured__item__price_2">{dish.price}$</span>
                                                <span className="featured__item__price_1">{dish.old_price}$</span>
                                            </div>
                                        </div>
                                        <div className="featured__item__by">
                                            <span>By: </span>
                                            <span className="featured__item__by__title">{dish && dish.restaurant? dish.restaurant.title:""}</span>
                                        </div>
                                    </div>
                                    <div className="featured__item__view">
                                        <button><a className="text-light" href={`${dish.did}`}>View Detail</a></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <Pagniation page={page} setPage={setPage} count={num_res}/>
            </div>
        </div>
     );
}

export default OtherDish;