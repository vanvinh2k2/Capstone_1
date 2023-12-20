import AllRestaurant from './AllRestaurant/AllRestaurant'
import Banner from './Banner/Banner'
import RestaurantHot from './RestaurantHot/RestaurantHot'
import { getRestaurant, searchRestaurant } from '../../action/restaurant'
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'

function Home({q, setQ}) {
    const dispatch = useDispatch();
    const restaurants = useSelector(state=>state.restaurant.restaurant.results)
    const num_res = useSelector(state=>state.restaurant.restaurant.count)
    const [page, setPage] = useState(1);
    
    useEffect(()=>{
        const fetchData = async () => {
            const action = await getRestaurant(page);
            dispatch(action);
        };

        const searchData = async () => {
            const action = await searchRestaurant(page, q);
            dispatch(action);
        };

        if(q==="") fetchData();
        else searchData();
    }, [page, q])

    return (  
        <>
            <Banner q={q} setQ={setQ}/>
            <RestaurantHot/>
            <AllRestaurant 
                restaurants={restaurants}
                num_res={num_res}
                page={page}
                setPage={setPage}
            />
        </>
    );
}

export default Home;