import imgsrc from '../../assets/images/res.png'
import {NavLink} from 'react-router-dom'

function HistoryOrder() {
    return ( 
        <div>
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>History Order</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>History Order</p>
                </div>
                <div className="add-dish">
                    
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" class="table table-striped">
                    <thead>
                        <tr>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=1">Oid</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=2">Order Date</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=3">Price</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=4">Product Status</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=5">Time from</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=6">Time to</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=7">Number People</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=7">Deposit</a>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr role="row" class="even">
                            <th>
                                <a href="/restaurant/update-dish">oid12345</a>
                            </th>
                            <td>24/3/2002</td>
                            <td>54.00</td>
                            <td>Not paid yet</td>
                            <td>3 pm</td>
                            <td class="nowrap">10 pm</td>
                            <td class="nowrap">4</td>
                            <td class="nowrap">16.20$</td>
                        </tr>
                        <tr role="row" class="odd">
                            <th>
                                <a href="/restaurant/update-dish">oid12345</a>
                            </th>
                            <td>11/2/2002</td>
                            <td>76.00</td>
                            <td>Not paid yet</td>
                            <td>4 pm</td>
                            <td class="nowrap">10 pm</td>
                            <td class="nowrap">4</td>
                            <td class="nowrap">20.20$</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default HistoryOrder;