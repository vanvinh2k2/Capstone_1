
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import {getRestaurant, postLike} from '../../../action/restaurant'
import Pagniation from '../../../components/Pagniation/Pagniation'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { POST_LIKE } from '../../../action/types';

function AllRestaurant() {
    const dispatch = useDispatch();
    const restaurants = useSelector(state=>state.restaurant.restaurant.results)
    const num_res = useSelector(state=>state.restaurant.restaurant.count)
    const [page, setPage] = useState(1);

    useEffect(()=>{
        const fetchData = async () => {
            const action = await getRestaurant(page);
            dispatch(action);
        };
        fetchData();
    }, [page])

    async function handelLike(e){
        const action = await postLike(
            localStorage.getItem("iduser"),
            e.currentTarget.getAttribute('value')
        );
        if(action.type === POST_LIKE){
            toast.success("Add like successfully.")
        }
        else toast.error("Added previously!")
        dispatch(action);
    }
    return ( 
        <section className="featured">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="section-title">
                        <h3>Popular Restaurant</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                {restaurants&&restaurants.map((restaurant, index)=>{
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                            <div className="featured__content">
                                <div className="featured__item">
                                    <div className="featured__item__pic">
                                        <img src={restaurant.image}/>
                                        <ul className="featured__item__pic__hover">
                                            <li value={restaurant.rid} onClick={handelLike}><a><i className="fa fa-heart"></i></a></li>
                                            <li><a href={`/detail-restaurant/${restaurant.rid}`}><i className="fa fa-eye"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="featured__item__text">
                                        <h6><a href="#">{restaurant.title}</a></h6>
                                        <p className="featured__item__address">{restaurant.address}</p>
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
                                                <p>{restaurant.time_open && restaurant.time_open !==null? restaurant.time_open.substring(0,5)
                                                : restaurant.time_open}</p>
                                                <p>-</p>
                                                <p>{restaurant.time_close && restaurant.time_close !==null? restaurant.time_close.substring(0,5)
                                                : restaurant.time_close}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <Pagniation page={page} setPage={setPage} count={num_res}/>
            </div>
        </div>
        <ToastContainer/>
    </section>
     );
}

export default AllRestaurant;

