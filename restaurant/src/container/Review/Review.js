function Review() {
    return ( 
        <div>
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
            <div className="view-link">
                    <p className='top'>Reviews</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>Reviews</p>
                </div>
                <div className="add-review">
                    
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" class="table table-striped">
                    <thead>
                        <tr>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=1">User</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=2">Restaurant</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=3">Review</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=4">Rating</a>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <a href="?o=5">Date</a>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr role="row" class="even">
                            <th>Loi ngao</th>
                            <td>Nhaf Hnag Ga Ran</td>
                            <td>ngon</td>
                            <td>★★★★☆</td>
                            <td>20/10/2023</td>
                        </tr>
                        <tr role="row" class="odd">
                        <th>Hoa ngao</th>
                            <td>Nhaf Hnag Ga new</td>
                            <td>te</td>
                            <td>★★★☆☆</td>
                            <td>22/10/2023</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default Review;