import { getDishes } from "../../../action/dish";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'


function BestDish() {
    const dispatch = useDispatch();
    const dishes = useSelector(state=>state.dish.dishes);

    useEffect(()=>{
        async function getdishes(){
            const action = await getDishes();
            dispatch(action);
        }
        getdishes();
    },[])

    return ( 
        <div className="container menu__dish">
            <div className="row">
                <h3>The Best Dishes</h3>
            </div>
            <div className="row">
                {dishes.map((dish, index)=>{
                    return(
                        <div className="col-lg-4 col-sm-6 col-md-6" key={index}>
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
                                            <span className="featured__item__by__title">{dish.restaurant.title}</span>
                                        </div>
                                    </div>
                                    <div className="featured__item__view">
                                        <button><a href={`/detail-dish/${dish.did}`}>View Detail</a></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}

export default BestDish;