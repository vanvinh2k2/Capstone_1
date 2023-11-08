import {NavLink, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailTable, updateTable } from '../../action/restaurant';
import {useParams} from 'react-router-dom'
import { UPDATE_TABLE } from '../../action/type';

function UpdateTable() {
    const dispatch = useDispatch();
    const {tid} = useParams();
    const [title, setTitle] = useState("");
    const table = useSelector(state=>state.restaurant.table);
    const navigate = useNavigate();

    async function handelSubmit(e){
        e.preventDefault();
        const action = await updateTable(tid, title);
        console.log(action);
        dispatch(action);
        if(action.type === UPDATE_TABLE){
            navigate('/restaurant/table')
        }
    }

    useEffect(()=>{
        setTitle(title)
        async function getDetailTable(){
            const action = await detailTable(tid);
            // console.log(action);
            dispatch(action);
        }
        getDetailTable();
    }, [])

    useEffect(()=>{
        setTitle(table.title);
    }, [table])

    return ( 
        <div class="content">
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Tables</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i class="fas fa-chevron-right"></i>
                    <p><NavLink to="/restaurant/table">The Tables</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>Update Table</p>
                </div>
                <div className="add-dish">
                    
                </div>
            </nav>
            <div class="container-fluid">
                <section class="content">
                    <div class="row">
                        <div id="content-main">
                                <input type="hidden"/>
                                <div class="row">
                                    <div class="col-12 col-lg-9">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="form-group field-did">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_did">
                                                            Tid
                                                            <span class="text-red">* </span> 
                                                        </label>
                                                        <div class=" col-sm-7 field-did ">
                                                            <input className="input" type="text" value={table?table.tid:""} disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group field-title">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left">
                                                            Title
                                                            <span class="text-red">* </span>  
                                                        </label>
                                                        <div class=" col-sm-7 field-title">
                                                            <input onChange={e=>setTitle(e.target.value)} value={title} className="input" type="text"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-3">
                                        <div class="form-group">
                                            <input onClick={handelSubmit} type="submit" value="Save" class="btn btn-success form-control"/>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
     );
}

export default UpdateTable;