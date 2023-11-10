import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import { deleteDish, getDishes } from '../../action/restaurant';
import img from '../../assets/images/empty.png'

function Dish() {
    const dishes = useSelector(state=>state.restaurant.dishes);
    const dispatch = useDispatch();

    useEffect(()=>{
        async function getdishes(){
            const action  = await getDishes(localStorage.getItem('rid'))
            dispatch(action);
        }
        getdishes();
    }, [])

    async function handelDelete(e){
        const action = await deleteDish(localStorage.getItem('rid'), e.currentTarget.getAttribute('id-dish'));
        dispatch(action);
        alert("Delete success.");
    }

    return ( 
        <div>
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Dishes</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
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
                                    <b>Did</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Title</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Dish Image</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Price</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Date</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Featured</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Action</b>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes&&dishes.length>0?dishes.map((item, index)=>{
                            return (
                                <tr role="row" class="even" key={index}>
                                    <th>
                                        <NavLink to={`/restaurant/update-dish/${item.did}`}>{item.did}</NavLink>
                                    </th>
                                    <td>{item.title}</td>
                                    <td>
                                        <img src={`${item.image}`} alt="True"/>
                                    </td>
                                    <td>{item.price}$</td>
                                    <td>{item.date.substring(0,10)}</td>
                                    <td class="nowrap">
                                        {item.featured?<i class="fa-solid fa-circle-check" style={{color: "green"}}></i>
                                        :<i class="fa-solid fa-circle-xmark" style={{color: "red"}}></i>}
                                    </td>
                                    <td class="nowrap"><i onClick={handelDelete} id-dish={item.did} class="fa-solid fa-trash"></i></td>
                                </tr>
                            )
                        }):<tr role="row">
                            <td colSpan={7} className="text-center">
                                <img src={img}/>
                                <h6 className="text-secondary">No data</h6>
                            </td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default Dish;