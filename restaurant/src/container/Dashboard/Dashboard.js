import { Chart, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryOrder } from '../../action/restaurant';
import {NavLink} from 'react-router-dom'
import { useEffect } from "react";
import img from '../../assets/images/empty.png'
Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

function Dashboard() {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
            fill: false,
            backgroundColor: '#b1f3b1',
            tension: 0.1
          }
        ]
    };

    const data2 = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56],
            fill: true,
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            tension: 0.1
          }
        ]
    };

    const orders = useSelector(state=>state.restaurant.orders);
    const dispatch = useDispatch();
    const status = {
        "awaiting_confirmation": "Awaiting confirmation",
        "confirmed": "Confirmed",
        "cancel": "Cancel",
        "complete": "Complete"
    }

    useEffect(()=>{
        async function gethistoryOrder(){
            const action  = await getHistoryOrder(localStorage.getItem('rid'))
            dispatch(action);
        }
        gethistoryOrder();
    }, [])

    return ( 
        <div>
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>Dashboard</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>Dashboard</p>
                </div>
            </nav>
            <div className="content-dastboard">
                <div className='row'>
                    <div className='col-lg-8 col-sm-12 col-md-12'>
                        <div className='content-chart card'>
                            <h3>Statistics of orders list by month</h3>
                            <Bar className='order-chart' data={data}/>
                        </div>
                    </div>
                    <div className='col-lg-4 col-sm-12 col-md-12'>
                        <div className='content-chart card'>
                            <h3>Statistics of users who order the most</h3>
                            <Pie className='user-chart' data={data2} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12 col-sm-12 col-md-12'>
                    <div className='content-order card'>
                            <h3>The current order</h3>
                            <table id="result_list" class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                            <div class="text">
                                                <p>Oid</p>
                                            </div>
                                        </th>
                                        <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                            <div class="text">
                                                <p>Order Date</p>
                                            </div>
                                        </th>
                                        <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                            <div class="text">
                                                <p>Price</p>
                                            </div>
                                        </th>
                                        <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                            <div class="text">
                                                <p>Product Status</p>
                                            </div>
                                        </th>
                                        <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                            <div class="text">
                                                <p>Time from</p>
                                            </div>
                                        </th>
                                        <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                            <div class="text">
                                                <p>Time to</p>
                                            </div>
                                        </th>
                                        <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                            <div class="text">
                                                <p>Number People</p>
                                            </div>
                                        </th>
                                        <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                            <div class="text">
                                                <p>Deposit</p>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders&&orders.length>0?orders.map((item, index)=>{
                                        if(index<10)
                                        return (
                                            <tr role="row" class="even" key={index}>
                                                <th><NavLink to={`/restaurant/history-detail/${item.oid}`} >{item.oid}</NavLink></th>
                                                <td>{item.order_date.substring(0,10)}</td>
                                                <td>{item.price}$</td>
                                                <td>{status[item.product_status]}</td>
                                                <td>{item.time_from.substring(0,5)}</td>
                                                <td class="nowrap">{item.time_to.substring(0,5)}</td>
                                                <td class="nowrap">{item.number_people}</td>
                                                <td class="nowrap">{item.deposit}$</td>
                                            </tr>
                                        )
                                    }): <tr role="row">
                                        <td colSpan={7} className="text-center">
                                            <img src={img}/>
                                            <h6 className="text-secondary">No data</h6>
                                        </td>
                                    </tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
