import imgsrc from '../../assets/images/res.png'
import {NavLink} from 'react-router-dom'

function Dish() {
    return ( 
        <div>
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Dishes</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>The Dishes</p>
                </div>
                <div className="add-dish">
                    <NavLink className="btn" to="/restaurant/add-dish" style={{color: "white"}}>
                        <i class="fa-solid fa-circle-plus" style={{margin: "0 10px 0 0"}}></i>
                        Add Dish
                    </NavLink>
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" class="table table-striped">
                    <thead>
                        <tr>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=1">Did</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=2">Title</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=3">Dish Image</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=4">Price</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=5">Date</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=6">Featured</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=7">Action</a>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr role="row" class="even">
                            <th>
                                <a href="/restaurant/update-dish">did12345</a>
                            </th>
                            <td>Ga Ran</td>
                            <td>
                                <img src={imgsrc} alt="True"/>
                            </td>
                            <td>200$</td>
                            <td>20/10/2023</td>
                            <td class="nowrap">ok</td>
                            <td class="nowrap"><i class="fa-solid fa-trash"></i></td>
                        </tr>
                        <tr role="row" class="odd">
                        <th>
                                <a href="/restaurant/update-dish">did17340</a>
                            </th>
                            <td>Ga Luoc</td>
                            <td>
                                <img src={imgsrc} alt="True"/>
                            </td>
                            <td>700$</td>
                            <td>20/10/2023</td>
                            <td class="nowrap">ok</td>
                            <td class="nowrap"><i class="fa-solid fa-trash"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default Dish;