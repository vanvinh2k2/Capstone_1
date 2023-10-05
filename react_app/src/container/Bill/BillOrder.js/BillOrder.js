

function BillOrder() {
    return ( 
        <div className="row">
            <h3 className="">Information of the Dishes</h3>
            <div className="col-lg-12 col-sm-12 col-md-12">
                <div className="content-payment">
                <table>
                  <thead>
                    <tr>
                      <th className="payment-title">Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="payment-title">
                        <p>Noi dung</p>
                        <p>ma: 123456</p>
                      </td>
                      <td className="payment-price"><span>$1698</span></td>
                      <td className="payment-quantity"><span>1</span></td>
                      <td className="payment-amount"><span>$7896</span></td>
                    </tr>
                    <tr>
                      <td className="payment-title">
                        <p>Noi dung</p>
                        <p>ma: 123456</p>
                      </td>
                      <td className="payment-price"><span>$1698</span></td>
                      <td className="payment-quantity"><span>1</span></td>
                      <td className="payment-amount"><span>$7896</span></td>
                    </tr>
                    <tr>
                      <td className="payment-title">
                        <p>Noi dung</p>
                        <p>ma: 123456</p>
                      </td>
                      <td className="payment-price"><span>$1698</span></td>
                      <td className="payment-quantity"><span>1</span></td>
                      <td className="payment-amount"><span>$7896</span></td>
                    </tr>
                    <tr>
                      <td className="payment-title">
                        <p>Noi dung</p>
                        <p>ma: 123456</p>
                      </td>
                      <td className="payment-price"><span>$1698</span></td>
                      <td className="payment-quantity"><span>1</span></td>
                      <td className="payment-amount"><span>$7896</span></td>
                    </tr>
                    <tr>
                      <td className="title-payment" colspan="3">
                        <span>SubTotal</span>
                      </td>
                      <td className="payment-subtotal"><span>$7896</span></td>
                    </tr>
                    <tr>
                      <td className="title-payment" colspan="3">
                        <span>Diposited</span>
                      </td>
                      <td className="payment-tax"><span>$78</span></td>
                    </tr>
                    <tr>
                      <td className="title-payment" colspan="3">
                        <span>Grand Total</span>
                      </td>
                      <td className="payment-total"><span>$7896</span></td>
                    </tr>
                  </tbody>
                </table>
                </div>
            </div>
        </div>
     );
}

export default BillOrder;