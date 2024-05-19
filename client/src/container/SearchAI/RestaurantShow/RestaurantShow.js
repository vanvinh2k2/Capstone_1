import { useSelector } from 'react-redux';
import notfoundimg from '../../../assets/images/not_found.png';
import { postLike } from '../../../action/restaurant';
import { POST_LIKE } from '../../../action/types';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux'

function RestaurantSearch() {
    const dishes = useSelector(state=>state.dish.dishes.restaurant);
    const result = useSelector(state=>state.dish.dishes.result);
    const dispatch = useDispatch();

    async function handelLike(e){
        if(localStorage.getItem("access") !== null){
            const action = await postLike(
                localStorage.getItem("iduser"),
                e.currentTarget.getAttribute('value'),
                localStorage.getItem("access")
            );
            dispatch(action);
            if(action.type === POST_LIKE){
                toast.success(action.payload);
            } else toast.error(action.payload);
        } else toast.error("Please login Account!")
        
    }

    return ( 
        <>
            <div className="container menu__dish">
                <div className="row">
                     <h3>The Dishes</h3>
                </div>
                {result !== null?<p>Searching with results "{result}"</p>:"Can't recognize this image"}
                <div className="row">
                    {/* {dishes&&dishes.length>0?dishes.map((dish, index)=>{
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
                                            <button><a href={`/detail-restaurant/${dish.restaurant.rid}`}>View Restaurant</a></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }):<div className='d-flex flex-column align-items-center'>
                        <img src={notfoundimg} className='center mt-5'/>
                        <h3 className='text-secondary mt-3 mb-5'>No results were found</h3>
                    </div>}    */}
                    {dishes&&dishes.length>0?dishes.map((dish, index)=>{
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                            <div className="featured__content">
                                <div className="featured__item">
                                    <div className="featured__item__pic">
                                        <img src={dish.restaurant.image}/>
                                        <ul className="featured__item__pic__hover">
                                            <li value={dish.restaurant.rid} onClick={handelLike}><a><i className="fa fa-heart"></i></a></li>
                                            <li><a href={`/detail-restaurant/${dish.restaurant.rid}`}><i className="fa fa-eye"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="featured__item__text">
                                        <h6><a href="#">{dish.restaurant.title}</a></h6>
                                        <p className="featured__item__address">{dish.restaurant.address}</p>
                                        <div className="featured__item__rate">
                                            <span>Rate: </span>
                                            <div className="featured__item__rate-content">
                                                <span>3.5/5</span>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="featured__item__status">
                                            <span>Open: </span>
                                            <div className="featured__item__status__time">
                                                <p>{dish.restaurant.time_open && dish.restaurant.time_open !==null? dish.restaurant.time_open.substring(0,5)
                                                : dish.restaurant.time_open}</p>
                                                <p>-</p>
                                                <p>{dish.restaurant.time_close && dish.restaurant.time_close !==null? dish.restaurant.time_close.substring(0,5)
                                                : dish.restaurant.time_close}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                :<>
                    <div className='d-flex flex-column align-items-center'>
                        <img src={notfoundimg} className='center mt-5'/>
                        <h3 className='text-secondary mt-3 mb-5'>No results were found</h3>
                    </div>
                </>
                }
                </div>
            </div>
            <ToastContainer/>
        </>
     );
}

export default RestaurantSearch;