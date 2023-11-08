import {NavLink} from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTables, deleteTable } from '../../action/restaurant';

function Table() {
    const tables = useSelector(state=>state.restaurant.tables);
    const dispatch = useDispatch();
    const rid = "res51312ab1b4";

    useEffect(()=>{
        async function gettables(){
            const action  = await getTables(rid)
            dispatch(action);
        }
        gettables();
    }, []);

    async function handleDelete(e){
        const action = await deleteTable(rid, e.currentTarget.getAttribute('id-table'));
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
                    <p className='top'>The Tables</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>The Tables</p>
                </div>
                <div className="add-table">
                    <NavLink className="btn" to="/restaurant/add-table" style={{color: "white"}}>
                        <i class="fa-solid fa-circle-plus" style={{margin: "0 10px 0 0"}}></i>
                        Add Table
                    </NavLink>
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" class="table table-striped">
                    <thead>
                        <tr>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Tid</b>
                                </div>
                            </th>
                            <th class="sorting" tabindex="0" rowspan="1" colspan="1">
                                <div class="text">
                                    <b>Title</b>
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
                        {tables ?tables.map((item, index)=>{
                            return (
                                <tr role="row" class="even" key={index}>
                                    <th>
                                        <NavLink to={`/restaurant/update-table/${item.tid}`}>{item.tid}</NavLink>
                                    </th>
                                    <td>{item.title}</td>
                                    <td class="nowrap"><i onClick={handleDelete} id-table={item.tid} class="fa-solid fa-trash"></i></td>
                                </tr>
                            )
                        }):""}
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default Table;