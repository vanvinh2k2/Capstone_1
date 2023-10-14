function BillUser(props) {
    const order = props.order;
    // console.log(order);
    return ( 
        <div className="row bill_2">
            <div className="col-lg-6 col-sm-6 col-md-12">
                <div className="bill_user">
                    <h3>Information of User</h3>
                    <div className="separate"></div>
                    <div className="bill__content">
                        <div className="bill__item">
                            <p className="bill__item__title">Name User : </p>
                            <p className="bill__item__content">{order?order.full_name:""}</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Phone : </p>
                            <p className="bill__item__content">{order?order.phone:""}</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Email : </p>
                            <p className="bill__item__content">{localStorage.getItem("email")}</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Date Order : </p>
                            <p className="bill__item__content">02/02/2023</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Time : </p>
                            <p className="bill__item__content">{order?order.time_from:""} - {order?order.time_to:""}</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Number of People : </p>
                            <p className="bill__item__content">{order?order.number_people:""}</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Table : </p>
                            <p className="bill__item__content">{order&&order.table?order.table.title:""}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-sm-6 col-md-12">
                <div className="bill_restaurant">
                <h3>Information of Restaurant</h3>
                    <div className="separate"></div>
                    <div className="bill__content">
                        <div className="bill__item">
                            <p className="bill__item__title">Restaurant : </p>
                            <p className="bill__item__content">{order&&order.restaurant?order.restaurant.title:""}</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Address : </p>
                            <p className="bill__item__content">{order&&order.restaurant?order.restaurant.address:""}</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Phone : </p>
                            <p className="bill__item__content">{order&&order.restaurant?order.restaurant.user.phone:""}</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Email : </p>
                            <p className="bill__item__content">{order&&order.restaurant?order.restaurant.user.email:""}</p>
                        </div>
                    </div>
                </div>      
            </div>
        </div>
     );
}

export default BillUser;