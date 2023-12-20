import InforDish from "./InforDish/InforDish";
import OtherDish from "./OtherDish/OtherDish";
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import { getDish } from "../../action/dish";

function DetailDish() {
    const {did} = useParams();
    const dispatch = useDispatch();
    const dish = useSelector(state=>state.dish.dish);
    
    useEffect(()=>{
        async function getdish(){
            const action = await getDish(did);
            dispatch(action);
        }
        getdish();
    }, [])
    
    return ( 
        <div className="container">
            <InforDish dish = {dish}/>
            <OtherDish rid = {dish && dish.restaurant? dish.restaurant.rid : null}/>
        </div>
     );
}

export default DetailDish;