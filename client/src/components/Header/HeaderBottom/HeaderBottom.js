function HeaderBottom() {
    return ( 
        <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><a href="/">Home</a></li>
                                <li><a href="/dish">DISHES</a></li>
                                <li><a href="/history-order">HISTORY ORDER</a></li>
                                <li><a href="/search-ai">Search AI</a></li>
                                <li><a href="/contact">CONTACT US</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__contact">
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>+65 11.188.888</h5>
                                        <span>Support 24/7</span>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default HeaderBottom;