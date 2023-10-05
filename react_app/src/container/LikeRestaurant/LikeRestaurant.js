import { useState } from "react";
import imgres from '../../assets/images/res.png'
function LikeRestaurant() {
    return ( 
        <div className="container">
            <div className="row">
                
                <div className="like__restaurant">
                <h3>Like Restaurant</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Rid</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Contact</th>
                            <th>Time Open</th>
                            <th>Time Close</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>res45op888</td>
                            <td><span>skhf sjfhhf</span></td>
                            <td><img src={imgres}/></td>
                            <td>0354987652</td>
                            <td>7:00</td>
                            <td>11:00</td>
                            <td>
                                <i class="fas fa-eye"></i>
                                <i class="fas fa-trash"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>res45op888</td>
                            <td><span>skhf sjfhhf</span></td>
                            <td><img src={imgres}/></td>
                            <td>0354987652</td>
                            <td>7:00</td>
                            <td>11:00</td>
                            <td>
                                <i class="fas fa-eye"></i>
                                <i class="fas fa-trash"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>res45op888</td>
                            <td><span>skhf sjfhhf</span></td>
                            <td><img src={imgres}/></td>
                            <td>0354987652</td>
                            <td>7:00</td>
                            <td>11:00</td>
                            <td>
                                <i class="fas fa-eye"></i>
                                <i class="fas fa-trash"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>res45op888</td>
                            <td><span>skhf sjfhhf</span></td>
                            <td><img src={imgres}/></td>
                            <td>0354987652</td>
                            <td>7:00</td>
                            <td>11:00</td>
                            <td>
                                <i class="fas fa-eye"></i>
                                <i class="fas fa-trash"></i>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
     );
}

export default LikeRestaurant