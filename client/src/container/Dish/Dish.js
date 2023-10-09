import Fillter from "./Fillter/Fillter"
import BestDish from "./BestDish/BestDish";


function Dish() {
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <Fillter/>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-12">
                    <BestDish/>
                </div>
            </div>
        </div>
     );
}

export default Dish;