import DetailBill from "./DetailBill/DetailBill";
import DetailUser from "./DetailUser/DetailUser";

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
                            <DetailUser/>
                            <DetailBill/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DetailOrder;