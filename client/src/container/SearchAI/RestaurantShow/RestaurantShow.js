import resimg from '../../../assets/images/res.png'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function RestaurantSearch() {
    return ( 
        <>
        {/* <div className="container">
            <div className="row searchai">
            <div className="col-lg-12 col-sm-12 col-md-12">
                    <h3>Information from Image</h3>
                </div>
        <div className="col-lg-12 col-sm-12 col-md-12">
                    <div className="searchai__information">
                        <div className="item">
                            <p className="item__title">Name :</p>
                            <p className="item__content">Ga Ran </p>
                        </div>
                        <div className="item">
                            <p className="item__title">About price :</p>
                            <p className="item__content">100$ - 450$</p>
                        </div>
                        <div className="item">
                            <p className="item__title">Number of stores that carry this item :</p>
                            <p className="item__content">12</p>
                        </div>
                        <div className="item">
                            <p className="item__title">The ability to predict the about Image :</p>
                            <p className="item__content">80%</p>
                        </div>
                    </div>
                </div>
                </div>
                </div> */}
            <section className="featured">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="section-title">
                            <h3>Restaurants have this Dish</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="featured__content">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src={resimg}/>
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="/detail-restaurant"><i className="fa fa-eye"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <p className="featured__item__address">Duy phu, Duy Xuyen, Quang Nam</p>
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
                                            <p>10:00</p>
                                            <p>-</p>
                                            <p>21:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="featured__content">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src={resimg}/>
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="/detail-restaurant"><i className="fa fa-eye"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <p className="featured__item__address">Duy phu, Duy Xuyen, Quang Nam</p>
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
                                            <p>10:00</p>
                                            <p>-</p>
                                            <p>21:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="featured__content">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src={resimg}/>
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="/detail-restaurant"><i className="fa fa-eye"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <p className="featured__item__address">Duy phu, Duy Xuyen, Quang Nam</p>
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
                                            <p>10:00</p>
                                            <p>-</p>
                                            <p>21:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="featured__content">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src={resimg}/>
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="/detail-restaurant"><i className="fa fa-eye"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <p className="featured__item__address">Duy phu, Duy Xuyen, Quang Nam</p>
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
                                            <p>10:00</p>
                                            <p>-</p>
                                            <p>21:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            </section>
        </>
     );
}

export default RestaurantSearch;