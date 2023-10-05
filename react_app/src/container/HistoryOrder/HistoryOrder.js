import AllRestaurant from '../Home/AllRestaurant/AllRestaurant'

function HistoryOrder() {
    return ( 
        <>
        <div className="container">
            <div className="row history__order">
                <div className="col-lg-12">
                    <h3>History Order</h3>
                </div>
                <div className="col-lg-12">
                    <div className="history__order__content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Orders</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th className="torder__status">Paid Status</th>
                                    <th>Total</th>
                                    <th className="torder__actions">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>INVOICE-NO-4</td>
                                    <td className="order__date"><span>20/10/2023</span></td>
                                    <td className="order__status"><span>ok</span></td>
                                        <td className="order__statuspaid"><i className="fas fa-check-circle"></i></td>
                                        {/* <td className="order-statuspaid"><i className="fas fa-times-circle" style="color: red;"></i></td> */}
                                    
                                    <td className="order__total"><span>$200</span></td>
                                    <td className="order__action"><a href=""><i className="fas fa-eye"></i></a></td>
                                </tr>
                                <tr>
                                    <td>INVOICE-NO-3</td>
                                    <td className="order__date"><span>20/10/2023</span></td>
                                    <td className="order__status"><span>ok</span></td>
                                        {/* <td className="order__statuspaid"><i className="fas fa-check-circle"></i></td> */}
                                        <td className="order__statuspaid"><i className="fas fa-times-circle"></i></td>
                                    
                                    <td className="order__total"><span>$200</span></td>
                                    <td className="order__action"><a href=""><i className="fas fa-eye"></i></a></td>
                                </tr>
                                <tr>
                                    <td>INVOICE-NO-2</td>
                                    <td className="order__date"><span>20/10/2023</span></td>
                                    <td className="order__status"><span>ok</span></td>
                                        <td className="order__statuspaid"><i className="fas fa-check-circle"></i></td>
                                        {/* <td className="order-statuspaid"><i className="fas fa-times-circle" style="color: red;"></i></td> */}
                                    
                                    <td className="order__total"><span>$200</span></td>
                                    <td className="order__action"><a href=""><i className="fas fa-eye"></i></a></td>
                                </tr>
                                <tr>
                                    <td>INVOICE-NO-1</td>
                                    <td className="order__date"><span>20/10/2023</span></td>
                                    <td className="order__status"><span>ok</span></td>
                                        {/* <td className="order__statuspaid"><i className="fas fa-check-circle"></i></td> */}
                                        <td className="order__statuspaid"><i className="fas fa-times-circle"></i></td>
                                    
                                    <td className="order__total"><span>$200</span></td>
                                    <td className="order__action"><a href=""><i className="fas fa-eye"></i></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <AllRestaurant/>
        </>
     );
}

export default HistoryOrder;