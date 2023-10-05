import InforRestaurant from "./InforRestaurant/InforRestaurant";
import OrderRestaurant from "./OrderRestaurant/OrderRestaurant";
import Speciality from "./Speciality/Speciality";


function DetailRestaurant() {
    return ( 
        <div>
            <InforRestaurant/>
            <Speciality/>
            <OrderRestaurant/>
        </div>
     );
}

export default DetailRestaurant;