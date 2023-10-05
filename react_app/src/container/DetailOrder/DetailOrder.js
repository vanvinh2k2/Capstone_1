import resimg from '../../assets/images/res.png'

function DetailOrder() {
    return ( 
        <div className="container">
            <div className="order__restaurant">
                <div className="col-lg-12">
                    <h3>Order Restaurant</h3>
                </div>
                <div className="col-lg-12">
                    <div className="order__restaurant__content">
                        <div className="row">
                            <div className="col-lg-5 col-sm-12 col-md-12">
                            <div className="order__restaurant__table">
                                <h3>Information of User</h3>
                                <div className="item2">
                                    <p className="title">Name :</p>
                                    <p className="content">kosfh ksfksf</p>
                                </div>
                                <div className="item2">
                                    <p className="title">Email :</p>
                                    <p className="content">email@gmail.com</p>
                                </div>
                                <div className="item2">
                                    <p className="title">Phone :</p>
                                    <p className="content">0968543329</p>
                                </div>
                                <div className="item2">
                                    <p className="title">Date :</p>
                                    <p className="content">24/12/2023</p>
                                </div>
                                <div className="item2">
                                    <p className="title">From :</p>
                                    <p className="content">11:00</p>
                                </div>
                                <div className="item2">
                                    <p className="title">To :</p>
                                    <p className="content">12:00</p>
                                </div>
                                <div className="item2">
                                    <p className="title">Number people :</p>
                                    <p className="content">10</p>
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-md-12">
                            <div className="order__restaurant__dish">
                                <h3>The Orders</h3>
                                <div className="order__restaurant__dish__detail">
                                    <div className="order__restaurant__dish__detail__content">
                                        <h3>Món tráng miệng</h3>
                                        <div className="order__restaurant__dish__detail__item">
                                            <img src={resimg}/>
                                            <div className="detail__item__title">
                                                <h3>Ga quay</h3>
                                                <span>Suggessed</span>
                                            </div>
                                            <input type="number" value="1" min="1"/>
                                            <p>2000$</p>
                                            <button className="eye"><i className="fas fa-trash"></i></button>
                                        </div>
                                        <div className="order__restaurant__dish__detail__item">
                                            <img src={resimg}/>
                                            <div className="detail__item__title">
                                                <h3>Ga quay</h3>
                                                <span>Suggessed</span>
                                            </div>
                                            <input type="number" value="1" min="1"/>
                                            <p>2$</p>
                                            <button className="eye"><i className="fas fa-trash"></i></button>
                                        </div>
                                        <h3>Món chinh</h3>
                                        <div className="order__restaurant__dish__detail__item">
                                            <img src={resimg}/>
                                            <div className="detail__item__title">
                                                <h3>Ga quay</h3>
                                                <span>Suggessed</span>
                                            </div>
                                            <input type="number" value="1" min="1"/>
                                            <p>2000$</p>
                                            <button className="eye"><i className="fas fa-trash"></i></button>
                                        </div>
                                        <div className="order__restaurant__dish__detail__item">
                                            <img src={resimg}/>
                                            <div className="detail__item__title">
                                                <h3>Ga quay</h3>
                                                <span>Suggessed</span>
                                            </div>
                                            <input type="number" value="1" min="1"/>
                                            <p>2$</p>
                                            <button className="eye"><i className="fas fa-trash"></i></button>
                                        </div>
                                        <h3>Món phu</h3>
                                        <div className="order__restaurant__dish__detail__item">
                                            <img src={resimg}/>
                                            <div className="detail__item__title">
                                                <h3>Ga quay</h3>
                                                <span>Suggessed</span>
                                            </div>
                                            <input type="number" value="1" min="1"/>
                                            <p>2000$</p>
                                            <button className="eye"><i className="fas fa-trash"></i></button>
                                        </div>
                                        <div className="order__restaurant__dish__detail__item">
                                            <img src={resimg}/>
                                            <div className="detail__item__title">
                                                <h3>Ga quay</h3>
                                                <span>Suggessed</span>
                                            </div>
                                            <input type="number" value="1" min="1"/>
                                            <p>2$</p>
                                            <button className="eye"><i className="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="order__restaurant__cost">
                                    <p className="title__total">Total :</p>
                                    <p className="content_total">12000$</p>
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-12 col-sm-12">
                                <button className="btn"><a href="/bill">Deposit 200$ to Orders</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DetailOrder;