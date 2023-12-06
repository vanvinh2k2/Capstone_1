import MutiRangeSlider from "multi-range-slider-react"
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getCategory, getRestaurant } from "../../../action/restaurant";
import restaurant from "../../../reducers/restaurant";


function Fillter() {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const dispatch = useDispatch();
    const restaurants = useSelector(state=>state.restaurant.restaurant.results);
    const categorys = useSelector(state=>state.restaurant.categorys);

    const handleInput = (e)=>{
        setMinValue(e.minValue)
        setMaxValue(e.maxValue)
    }

    useEffect(()=>{
        async function getcategory(){
            const action = await getCategory();
            dispatch(action);
        }

        async function getrestaurant(){
            const action = await getRestaurant(1);
            dispatch(action);
        }

        getcategory();
        getrestaurant();
    }, [])

    return ( 
        <div className="sidebar">
            <div className="sidebar__item">
                <h3 data='' value=''>By Restaurant</h3>
                {restaurants&&restaurants.map((restaurant, index)=>{
                    return(
                        <label htmlFor={restaurant.rid} key={index}>
                            <input className="filter-checkbox" type="checkbox" id={restaurant.rid} value={restaurant.rid}/>
                            <p>{restaurant.title}</p>
                        </label>
                    )
                })} 
            </div>
            <div className="sidebar__item">
                <div className="separate"></div>
                <h3>By Category</h3>
                <div className="sidebar__item__vendor">
                    {categorys.map((category, index)=> {
                        return(
                            <label htmlFor={category.cid}>
                                <input className="filter-checkbox" type="checkbox" id={category.cid} value={category.cid}/>
                                <p>{category.title}</p>
                            </label>
                        )
                    })}
                </div>
            </div>
            <div className="sidebar__item view-top">
                <div className="separate"></div>
                <h3>By price</h3>
                <div className="price-range-wrap">
                    <MutiRangeSlider
                        min={0}
                        max={0}
                        step={5}
                        minValue={minValue}
                        maxValue={maxValue}
                        onInput={(e) =>{
                            handleInput(e);
                        }}
                    />
                    <div className="price-range-content">
                        <span>10$</span>
                        <span>-</span>
                        <span>100$</span>
                    </div>
                    <div className="range-confirm">
                        <button className="btn">Apply</button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Fillter;