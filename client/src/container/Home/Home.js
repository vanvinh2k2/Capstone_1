import AllRestaurant from './AllRestaurant/AllRestaurant'
import Banner from './Banner/Banner'
import Pagniation from '../../components/Pagniation/Pagniation'
import RestaurantHot from './RestaurantHot/RestaurantHot'

function Home() {
    return (  
        <>
            <Banner/>
            <RestaurantHot/>
            {/* <Pagniation/> */}
            <AllRestaurant/>
        </>
    );
}

export default Home;