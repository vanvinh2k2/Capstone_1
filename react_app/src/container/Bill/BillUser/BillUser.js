function BillUser() {
    return ( 
        <div className="row bill_2">
            <div className="col-lg-6 col-sm-6 col-md-12">
                <div className="bill_user">
                    <h3>Information of User</h3>
                    <div className="separate"></div>
                    <div className="bill__content">
                        <div className="bill__item">
                            <p className="bill__item__title">Name User : </p>
                            <p className="bill__item__content">Hien ko co ten</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Phone : </p>
                            <p className="bill__item__content">0386868686</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Email : </p>
                            <p className="bill__item__content"> user@gmail.com</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Date Order : </p>
                            <p className="bill__item__content">02/02/2023</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Time : </p>
                            <p className="bill__item__content">10:00 - 12:00</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Number of People : </p>
                            <p className="bill__item__content">10</p>
                        </div>
                        <div className="bill__item">
                            <p className="bill__item__title">Table : </p>
                            <p className="bill__item__content">Table 1</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-sm-6 col-md-12">
                <div class="bill_restaurant">
                <h3>Information of Restaurant</h3>
                    <div class="separate"></div>
                    <div class="bill__content">
                        <div class="bill__item">
                            <p class="bill__item__title">Restaurant : </p>
                            <p class="bill__item__content"> Nha Hang Cua Bien</p>
                        </div>
                        <div class="bill__item">
                            <p class="bill__item__title">Address : </p>
                            <p class="bill__item__content">Duy Phu, Duy Xuyen, Quang Nam</p>
                        </div>
                        <div class="bill__item">
                            <p class="bill__item__title">Phone : </p>
                            <p class="bill__item__content">0386868686</p>
                        </div>
                        <div class="bill__item">
                            <p class="bill__item__title">Email : </p>
                            <p class="bill__item__content"> nhahang@gmail.com</p>
                        </div>
                    </div>
                </div>
                    
                </div>
        </div>
     );
}

export default BillUser;