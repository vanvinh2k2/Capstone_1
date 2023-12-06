function InforDish(props) {
    const dish = props.dish
    return (
        <div className="container">
            <div className="row product__details">
                <h3>Detail about Dish</h3>
                <div className="col-lg-5 col-sm-12 col-md-6">
                    <img src={`${dish&&dish.image}`}/>
                </div>
                <div className="col-lg-7 col-sm-12 col-md-6">
                    <div className="product__details__text">
                        <h3>{dish&&dish.title}</h3>
                        <div className="product-infor">
                            <b>By:</b> { dish&&dish.restaurant && dish.restaurant.title !== null? dish.restaurant.title : "null"}
                        </div>
                        <div className="product-infor">
                            <b>Price :</b> {dish&&dish.price}$
                        </div>
                        <div className="product-infor">
                            <b>Coupon :</b> 10%
                        </div>
                        <div className="product-infor">
                            <button className="btn"><a className="text-light" href={"/detail-restaurant/"+`${dish&&dish.restaurant? dish.restaurant.rid: ""}`}>View Restaurant</a></button>
                        </div>
                        <h4>Information detail:</h4>
                        <div className="product-infor" dangerouslySetInnerHTML={{ __html: dish&&dish.description }}></div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default InforDish;