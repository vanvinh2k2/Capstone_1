import resimg from '../../../assets/images/res.png'

function ResultSearch() {
    return ( 
        <div className="container">
            <div className="row searchai">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <h3>Search Dish with Image</h3>
                </div>
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <div className="searchai__input">
                        <div className="searchai__input__img">
                            <p>Please Choice Image</p>
                        </div>
                        <button className="btn">Upload<input type="file"/></button>
                    </div>
                </div>
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <h3>Information from Image</h3>
                </div>
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <div className="searchai__information">
                        <div className="item">
                            <p className="item__title">Name :</p>
                            <p className="item__content">Ga Ran </p>
                        </div>
                        <div className="item">
                            <p className="item__title">About price :</p>
                            <p className="item__content">100$ - 450$</p>
                        </div>
                        <div className="item">
                            <p className="item__title">Number of stores that carry this item :</p>
                            <p className="item__content">12</p>
                        </div>
                        <div className="item">
                            <p className="item__title">The ability to predict the about Image :</p>
                            <p className="item__content">80%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default ResultSearch;