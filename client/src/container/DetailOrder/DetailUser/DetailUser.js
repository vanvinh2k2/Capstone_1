
import {useParams} from "react-router-dom"

function DetailUser(props) {
    const order = props.order;
    const {rid} = useParams();
    // console.log(order);

    const handleGoBack = () => {
        window.history.back();
    };

    return ( 
        <div className="col-lg-5 col-sm-12 col-md-12">
            <div className="order__restaurant__table">
                <h3>Information of User</h3>
                <div className="item2">
                    <p className="title">Name :</p>
                    <p className="content">{order? order.full_name: ""}</p>
                </div>
                <div className="item2">
                    <p className="title">Email :</p>
                    <p className="content">{localStorage.getItem("email")}</p>
                </div>
                <div className="item2">
                    <p className="title">Phone :</p>
                    <p className="content">{order? order.phone: ""}</p>
                </div>
                <div className="item2">
                    <p className="title">Date :</p>
                    <p className="content">{order? order.order_date: ""}</p>
                </div>
                <div className="item2">
                    <p className="title">From :</p>
                    <p className="content">{order?order.time_from.substring(0, 5): ""}</p>
                </div>
                <div className="item2">
                    <p className="title">To :</p>
                    <p className="content">{order?order.time_to.substring(0, 5): ""}</p>
                </div>
                <div className="item2">
                    <p className="title">Number people :</p>
                    <p className="content">{order? order.number_people: ""}</p>
                </div>
            </div>
            <a className="btn" href={"/detail-restaurant/"+rid}>Back</a>
        </div>
     );
}

export default DetailUser;