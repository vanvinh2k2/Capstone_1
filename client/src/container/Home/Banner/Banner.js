import banner from '../../../assets/images/restaurant-banner.jpeg'
import Slider from 'react-slick'

function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScrool: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    }
    return ( 
        <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <Slider {...settings}>
                        <img src={banner} className="banner1"/>
                        <img src={banner} className="banner1"/>
                        <img src={banner} className="banner1"/>
                        </Slider>
                            {/* <div className="hero__item"/> */}
                            
                        </div>
                    </div>
                </div>
            </section>
     );
}

export default Banner;