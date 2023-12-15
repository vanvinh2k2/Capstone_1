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
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Dishes</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i className="fas fa-chevron-right"></i>
                    <p>The Dishes</p>
                </div>
                <div className="add-dish">
                    <NavLink className="btn" to="/restaurant/add-dish" style={{color: "white"}}>
                        <i className="fa-solid fa-circle-plus" style={{margin: "0 10px 0 0"}}></i>
                        Add Dish
                    </NavLink>
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" className="table table-striped">
                    <thead>
                        <tr>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Did</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Title</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Dish Image</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Price</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Date</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Featured</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Action</p>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes&&dishes.length>0?dishes.map((item, index)=>{
                            return (
                                <tr role="row" className="even" key={index}>
                                    <th>
                                        <NavLink to={`/restaurant/update-dish/${item.did}`}>{item.did}</NavLink>
                                    </th>
                                    <td>{item.title}</td>
                                    <td>
                                        <img src={`${item.image}`} alt="True"/>
                                    </td>
                                    <td>{item.price}$</td>
                                    <td>{item.date.substring(0,10)}</td>
                                    <td className="nowrap">
                                        {item.featured?<i className="fa-solid fa-circle-check" style={{color: "green"}}></i>
                                        :<i className="fa-solid fa-circle-xmark" style={{color: "red"}}></i>}
                                    </td>
                                    <td className="nowrap"><i onClick={handelDelete} id-dish={item.did} className="fa-solid fa-trash"></i></td>
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