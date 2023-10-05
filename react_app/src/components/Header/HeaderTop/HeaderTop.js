import logo from '../../../assets/images/logo1.png'
import user from '../../../assets/images/default.png'
import { useState, useEffect } from "react";

function HeaderTop() {
    return ( 
        <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-2">
                        <div className="header__logo">
                            <a href="/">
                                <img src={logo} alt=""/>
                            </a>
                            <span>Booking Restaurant</span>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-9">
                        <div className="hero__search__form">
                            <form action="#">
                                <input type="text" placeholder="What do you need?"/>
                                <button type="submit" className="site-btn">SEARCH</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            <ul>
                                <li><a href="/love-restaurant"><i className="fa fa-heart"></i><span>1</span></a></li>
                                <li><a href="/history-order"><i className="fas fa-clipboard-list"></i><span>3</span></a></li>
                                <li className="account">
                                    {localStorage.getItem("token") != null ? <a href="/account"><img src={`${localStorage.getItem("avatar")}`}/>
                                    {localStorage.getItem("username")}</a> 
                                    : <a href="/login"><img src={user}/>login</a>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="humberger__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
    );
}

export default HeaderTop;