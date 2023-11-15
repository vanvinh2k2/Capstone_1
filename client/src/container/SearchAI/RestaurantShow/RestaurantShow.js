import { useSelector } from 'react-redux';
import notfoundimg from '../../../assets/images/not_found.png';

function RestaurantSearch() {
    const dishes = useSelector(state=>state.dish.dishes);
    console.log(dishes);
    return ( 
        <>
            <div className="container menu__dish">
                <div className="row">
                    <h3>The Best Dishes</h3>
                </div>
                <div className="row">
                    {dishes&&dishes.length>0?dishes.map((dish, index)=>{
                        return (
                            <div className="col-lg-3 col-sm-4 col-md-6" key={index}>
                                <div className="featured__content">
                                    <div className="featured__item">
                                        <div className="featured__item__pic">
                                            <img src={`${dish.image}`}/>
                                        </div>
                                        <div className="featured__item__text">
                                            <h6><a href="#">
                                                {dish.title}
                                                </a></h6>
                                            <div className="featured__item__sale">
                                                <span>Sale: </span>
                                                <span className="featured__item__sale_1">10%</span>
                                            </div>
                                            <div className="featured__item__price">
                                                <span>Price: </span>
                                                <div>
                                                    <span className="featured__item__price_2">
                                                        {dish.price} 
                                                        $</span>
                                                    <span className="featured__item__price_1">
                                                        {dish.old_price}$
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="featured__item__by">
                                                <span>By: </span>
                                                <span className="featured__item__by__title">
                                                    {dish.restaurant.title}
                                                    </span>
                                            </div>
                                        </div>
                                        <div className="featured__item__view">
                                            <button><a href={`/detail-dish/`}>View Restaurant</a></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }):<div className='d-flex flex-column align-items-center'>
                        <img src={notfoundimg} className='center mt-5'/>
                        <h3 className='text-secondary mt-3 mb-5'>No results were found</h3>
                    </div>}   
                </div>
            </div>
        </>
     );
}

export default RestaurantSearch;