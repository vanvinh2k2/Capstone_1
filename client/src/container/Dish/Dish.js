import Fillter from "./Fillter/Fillter"
import BestDish from "./BestDish/BestDish";
import { filterDish } from "../../action/dish";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

function Dish() {
    const dispatch = useDispatch();
    const dishes = useSelector(state=>state.dish.dishes.results);
    const num_res = useSelector(state=>state.dish.dishes.count)
    const [page, setPage] = useState(1);
    const [min_price, setMinPrice] = useState(0);
    const [max_price, setMaxPrice] = useState(100);
    const [categorys, setCategorys] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    
    useEffect(()=>{
        async function getdishes(){
            const action = await filterDish(max_price, min_price, restaurants, categorys, page);
            dispatch(action);
        }
        getdishes();
    }, [categorys, restaurants, min_price, max_price, page]);

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <Fillter 
                        min_price={min_price} 
                        setMinPrice={setMinPrice} 
                        max_price={max_price}
                        setMaxPrice={setMaxPrice}
                        setCategorys={setCategorys}
                        setRestaurants={setRestaurants}
                    />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <BestDish 
                        dishes={dishes} 
                        num_res={num_res} 
                        page={page} 
                        setPage={setPage}
                    />
                </div>
            </div>
        </div>
     );
}

export default Dish;