import banner from '../../../assets/images/restaurant-banner.jpeg';
import banner2 from '../../../assets/images/banner2.jpg';

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
                                    <img className="w-100 banner1" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/online-order-now-restaurant-discount-banner-design-template-c8abb6b3b188751b2cb637bc3871cbfb_screen.jpg?ts=1617107213"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="w-100 banner1" src={banner2}/>
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