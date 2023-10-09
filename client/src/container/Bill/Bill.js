import BillOrder from "./BillOrder.js/BillOrder";
import BillUser from "./BillUser/BillUser";

function Bill() {
    return ( 
        <div class="container the_bill">
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <h3 className="left"> Customer's Billing</h3>
                </div>
            </div>
            <div className="row line">
                <div className="bill">
                    <h2 className="center">The Bill of Customer</h2>
                    <BillUser/>
                    <BillOrder/>
                </div>
            </div>
            <div className="print">
                <button className="btn">Print Bill</button>
            </div>
        </div>
     );
}

export default Bill;