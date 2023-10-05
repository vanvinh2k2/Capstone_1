import aimg  from '../../../assets/images/res.png'
import { useNavigation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRestaurantDetail } from '../../../action/restaurant';

function InforRestaurant(props) {
    const dispatch = useDispatch();
    const {rid} = useParams();
    const restaurant = useSelector(state=>state.restaurant.restaurant_detail)
    useEffect(()=>{
        async function getDetail(rid){
            const action = await getRestaurantDetail(rid);
            dispatch(action);
        }
        getDetail(rid);
    }, [])

    return ( 
        <div className="container">
            <div className="row product__details">
                <h3>Detail about Restaurant</h3>
                <div className="col-lg-5 col-sm-12 col-md-6">
                    <img src={`${restaurant.image}`}/>
                </div>
                <div className="col-lg-7 col-sm-12 col-md-6">
                    <div className="product__details__text">
                        <h3>{restaurant.title}</h3>
                        <div className="product-infor">
                            <div className="product-evaluate">
                                <b>Evaluate :</b> 10k
                            </div>
                            <div className="prevent"></div>
                            <div className="product-rate">
                                4/5
                                <i className="fa fa-star"></i>
                            </div>
                        </div>
                        <div className="product-infor">
                            <b>Liked :</b>{restaurant.like}<i className="fa fa-heart"></i>
                        </div>
                        <div className="product-infor">
                            <b>Open:</b> {restaurant.time_open} - {restaurant.time_close}
                        </div>
                        <div className="product-infor">
                            <b>Address :</b> {restaurant.address}
                        </div>
                        <div className="product-infor">
                            <b>Phone :</b> {restaurant.contact}
                        </div>
                        <div className="product-infor">
                            <b>Follow Us :</b>
                            <div className="share">
                                <a href="#"><i className="fa-brands fa-facebook"></i></a>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            </div>
                        </div>
                        <div className="product-infor">
                            <b>Support Chat :</b><i className="far fa-comment-dots"></i>
                        </div>
                        <h4>Information :</h4>
                        <div className="product-infor content-text" dangerouslySetInnerHTML={{ __html: restaurant.description }}></div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default InforRestaurant;