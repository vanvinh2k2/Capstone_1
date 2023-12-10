import {NavLink} from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTables, deleteTable } from '../../action/restaurant';
import img from '../../assets/images/empty.png'

function Table() {
    const tables = useSelector(state=>state.restaurant.tables);
    const dispatch = useDispatch();

    useEffect(()=>{
        async function gettables(){
            const action  = await getTables(localStorage.getItem('rid'))
            dispatch(action);
        }
        gettables();
    }, []);

    async function handleDelete(e){
        const action = await deleteTable(localStorage.getItem('rid'), e.currentTarget.getAttribute('id-table'));
        dispatch(action);
        alert("Delete success.");
    }

    return ( 
        <div>
            <nav className='nav-header'>
                <i className="fas fa-list"></i>
                <i className="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Tables</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i className="fas fa-chevron-right"></i>
                    <p>The Tables</p>
                </div>
                <div className="add-table">
                    <NavLink className="btn" to="/restaurant/add-table" style={{color: "white"}}>
                        <i className="fa-solid fa-circle-plus" style={{margin: "0 10px 0 0"}}></i>
                        Add Table
                    </NavLink>
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" className="table table-striped">
                    <thead>
                        <tr>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Tid</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Title</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p>Number of Seat</p>
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
                        {tables&&tables.length>0?tables.map((item, index)=>{
                            return (
                                <tr role="row" className="even" key={index}>
                                    <th>
                                        <NavLink to={`/restaurant/update-table/${item.tid}`}>{item.tid}</NavLink>
                                    </th>
                                    <td>{item.title}</td>
                                    <td>{item.number_seat}</td>
                                    <td className="nowrap"><i onClick={handleDelete} id-table={item.tid} className="fa-solid fa-trash"></i></td>
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

export default Table;