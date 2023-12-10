import banner from '../../../assets/images/restaurant-banner.jpeg'

function Banner() {
    return ( 
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div id="demo" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="w-100 banner1" src={banner}/>
                                </div>
                                <div className="carousel-item">
                                    <img className="w-100 banner1" src="https://t3.ftcdn.net/jpg/01/63/13/30/360_F_163133061_TlMOMqgxAvBuwzLAjxOQ8v1FQ3OexfRG.jpg"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="w-100 banner1" src="https://t3.ftcdn.net/jpg/01/63/13/30/360_F_163133061_TlMOMqgxAvBuwzLAjxOQ8v1FQ3OexfRG.jpg"/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon"></span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                                <span className="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Banner;