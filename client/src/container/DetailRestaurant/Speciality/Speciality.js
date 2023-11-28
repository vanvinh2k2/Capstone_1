import resimg from '../../../assets/images/res.png'
import Slider from 'react-slick'
import '../../../sass/components/Slick/slick.css';
import '../../../sass/components/Slick/slick-theme.css';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDishesOfRestaurant } from '../../../action/dish';
import {useParams} from 'react-router-dom'


function Speciality() {
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
    const {rid} = useParams();
    const dishes = useSelector(state=>state.dish.dishes_res)
    const dispatch = useDispatch();
    useEffect(()=>{
        async function getDishes(){
            const action = await getDishesOfRestaurant(rid);
            dispatch(action);
        }
        getDishes();
    }, [])

    return ( 
        <div className="container speciality__dish">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <h3>Speciality Dishes</h3>
                </div>
            </div>
            <div className="row slider">
                <div className="products__slider">
                    <Slider {...settings}>
                    {dishes.map((dish, index)=>{
                        return(
                            <div className="content_slider" key={index}>
                                <div className="featured__content">
                                    <div className="featured__item">
                                        <div className="featured__item__pic">
                                            <img src={`${dish.image}`}/>
                                        </div>
                                        <div className="featured__item__text">
                                            <h6><a href="#">{dish.title}</a></h6>
                                            <div className="featured__item__sale">
                                                <span>Sale: </span>
                                                <span className="featured__item__sale_1">10%</span>
                                            </div>
                                            <div className="featured__item__price">
                                                <span>Price: </span>
                                                <div>
                                                    <span className="featured__item__price_2">{dish.price}$</span>
                                                    <span className="featured__item__price_1">{dish.old_price}$</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="featured__item__view">
                                            <button><a href={`/detail-dish/${dish.did}`}>View Detail</a></button>
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
     );
}

export default Speciality;