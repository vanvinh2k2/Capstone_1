import { useState , useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"

function DetailUser() {
    const order_user = useSelector(state=>state.order.order_user)
    const handleGoBack = () => {
        window.history.back();
    };
    return ( 
        <div className="col-lg-5 col-sm-12 col-md-12">
            <div className="order__restaurant__table">
                <h3>Information of User</h3>
                <div className="item2">
                    <p className="title">Name :</p>
                    <p className="content">{order_user.name}</p>
                </div>
                <div className="item2">
                    <p className="title">Email :</p>
                    <p className="content">{localStorage.getItem("email")}</p>
                </div>
                <div className="item2">
                    <p className="title">Phone :</p>
                    <p className="content">{order_user.phone}</p>
                </div>
                <div className="item2">
                    <p className="title">Date :</p>
                    <p className="content">24/12/2023</p>
                </div>
                <div className="item2">
                    <p className="title">From :</p>
                    <p className="content">{order_user.time_from}</p>
                </div>
                <div className="item2">
                    <p className="title">To :</p>
                    <p className="content">{order_user.time_to}</p>
                </div>
                <div className="item2">
                    <p className="title">Number people :</p>
                    <p className="content">{order_user.people}</p>
                </div>
            </div>
            <button className="btn" onClick={handleGoBack}>Back</button>
        </div>
     );
}

export default DetailUser;