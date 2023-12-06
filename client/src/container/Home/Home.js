import AllRestaurant from './AllRestaurant/AllRestaurant'
import Banner from './Banner/Banner'
import RestaurantHot from './RestaurantHot/RestaurantHot'

function Home() {
    return (  
        <>
            <Banner/>
            <RestaurantHot/>
            <AllRestaurant/>
        </>
    );
}

export default Home;