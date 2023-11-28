import React from 'react';
import Slider from 'react-slick'
import '../../../sass/components/Slick/slick.css';
import '../../../sass/components/Slick/slick-theme.css';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import {getRestaurantHot, postLike} from '../../../action/restaurant'


function RestaurantHot(props) {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScrool: 4,
        responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    }
    const dispatch = useDispatch();
    const restaurants = useSelector(state=>state.restaurant.restaurant_hot)
    useEffect(()=>{
        const fetchData = async () => {
            const action = await getRestaurantHot();
            dispatch(action);
        };
        fetchData();
    }, [])

    async function handelLike(e){
        const action = await postLike(
            localStorage.getItem("iduser"),
            e.currentTarget.getAttribute('value')
        );
        dispatch(action);
    }

    return ( 
        <section className="HotProduct">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h3>Restaurant Hot</h3>
                        </div>
                    </div>
                </div>
                <div className="row slider">
                    <div className="products__slider">
                        <Slider {...settings}>
                        {restaurants.map((restaurant, index)=>{
                            return(
                                <div className="content_slider" key={index}>
                                    <div className="featured__item_all">
                                        <div className="featured__item__pic">
                                            <img src={restaurant.image}/>
                                            <ul className="featured__item__pic__hover">
                                                <li value={restaurant.rid} onClick={handelLike}><a><i className="fa fa-heart"></i></a></li>
                                                <li><a href={`/detail-restaurant/${restaurant.rid}`}><i className="fa fa-eye"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="featured__item__text">
                                            <h6><a href="#">{restaurant.title}</a></h6>
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
                                                    <p>{restaurant.time_open && restaurant.time_open !== null ? restaurant.time_open.substring(0, 5) : restaurant.time_open}</p>
                                                    <p>-</p>
                                                    <p>{restaurant.time_close && restaurant.time_close !== null? restaurant.time_close.substring(0, 5)
                                                    : restaurant.time_close}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
        
    );
}

export default RestaurantHot;