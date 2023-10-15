import {NavLink} from 'react-router-dom'

function Table() {
    return ( 
        <div>
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Tables</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>The Tables</p>
                </div>
                <div className="add-table">
                    <NavLink className="btn" to="/restaurant/add-table" style={{color: "white"}}>
                        <i class="fa-solid fa-circle-plus" style={{margin: "0 10px 0 0"}}></i>
                        Add Table
                    </NavLink>
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" class="table table-striped">
                    <thead>
                        <tr>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=1">Tid</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=2">Title</a>
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
                                <NavLink to="/restaurant/update-table">tid12345</NavLink>
                            </th>
                            <td>Table 1</td>
                            <td class="nowrap"><i class="fa-solid fa-trash"></i></td>
                        </tr>
                        <tr role="row" class="even">
                            <th>
                                <a href="#">tid45149</a>
                            </th>
                            <td>Table 2</td>
                            <td class="nowrap"><i class="fa-solid fa-trash"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default Table;