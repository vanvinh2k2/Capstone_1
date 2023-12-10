import MutiRangeSlider from "multi-range-slider-react"
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getCategory, getRestaurant } from "../../../action/restaurant";

function Fillter({min_price, max_price, setMinPrice, setMaxPrice, setCategorys, setRestaurants}) {
    const dispatch = useDispatch();
    const list_restaurant = useSelector(state=>state.restaurant.restaurant.results);
    const list_category = useSelector(state=>state.restaurant.categorys);

    const handleInput = (e)=>{
        setMinPrice(e.minValue)
        setMaxPrice(e.maxValue)
    }

    function handelRes(e){
        const rid = e.target.value;
        if (e.target.checked) {
            setRestaurants((prevSelected) => [...prevSelected, {"rid": rid}]);
        } else {
            setRestaurants((prevSelected) => prevSelected.filter(restaurant => restaurant['rid'] !== rid));
        }
    }

    function handelCat(e){
        const cid = e.target.value;
        if (e.target.checked) {
            setCategorys((prevSelected) => [...prevSelected, {"cid": cid}]);
        } else {
            setCategorys((prevSelected) => prevSelected.filter(category => category['cid'] !== cid));
        }
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
                {list_restaurant&&list_restaurant.map((restaurant, index)=>{
                    return(
                        <label htmlFor={restaurant.rid} key={index}>
                            <input className="filter-checkbox" 
                                type="checkbox" rid={restaurant.rid} 
                                value={restaurant.rid} 
                                onChange={handelRes}
                            />
                            <p>{restaurant.title}</p>
                        </label>
                    )
                })} 
            </div>
            <div className="sidebar__item">
                <div className="separate"></div>
                <h3>By Category</h3>
                <div className="sidebar__item__vendor">
                    {list_category.map((category, index)=> {
                        return(
                            <label htmlFor={category.cid} key={index}>
                                <input className="filter-checkbox" 
                                    type="checkbox" cid={category.cid} 
                                    value={category.cid}
                                    onChange={handelCat}/>
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
                        minValue={min_price}
                        maxValue={max_price}
                        onInput={(e) =>{
                            handleInput(e);
                        }}
                    />
                    <div className="price-range-content">
                        <span>10$</span>
                        <span>-</span>
                        <span>100$</span>
                    </div>
                    {/* <div className="range-confirm">
                        <button className="btn" onClick={handelPrice}>Apply</button>
                    </div> */}
                </div>
            </div>
        </div>
     );
}

export default Fillter;