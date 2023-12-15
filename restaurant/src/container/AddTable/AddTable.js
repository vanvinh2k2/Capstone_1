import {NavLink, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTable } from '../../action/restaurant';
import { ADD_TABLE } from '../../action/type';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTable() {
    const [title, setTitle] = useState("");
    const [numberSeat, setNumberSeat] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handelSubmit(e){
        e.preventDefault();
        if(title!=="" && numberSeat !== ""){
            if(numberSeat>0){
                const action = await addTable(localStorage.getItem('rid'), title, numberSeat);
                dispatch(action);
                if(action.type === ADD_TABLE){
                    navigate("/restaurant/table");
                }
            }else toast.error("Number of Seat have to higher 0!")
            
        }else{
            toast.error("Please input Title or Number of Seat!");
        }
    }

    return ( 
        <div className="content">
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Tables</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i className="fas fa-chevron-right"></i>
                    <p><NavLink to="/restaurant/table">The Tables</NavLink></p>
                    <i className="fas fa-chevron-right"></i>
                    <p>Add Table</p>
                </div>
                <div className="add-dish">
                    
                </div>
            </nav>
            <div className="container-fluid">
                <section className="content">
                    <div className="row">
                        <div id="content-main">
                                <input type="hidden"/>
                                <div className="row">
                                    <div className="col-12 col-lg-9">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="form-group field-title">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left" htmlFor="id_title">
                                                            Title
                                                            <span className="text-red">* </span>  
                                                        </label>
                                                        <div className=" col-sm-7 field-title">
                                                            <input onChange={e=>setTitle(e.target.value)} className="input" type="text"/>
                                                        </div>
                                                        <label className="col-sm-3 text-left" htmlFor="id_title" style={{marginTop: "15px"}}>
                                                            Number of Seat
                                                            <span className="text-red">* </span>  
                                                        </label>
                                                        <div className=" col-sm-7" field-title style={{marginTop: "15px"}}>
                                                            <input onChange={e=>setNumberSeat(e.target.value)} className="input" type="number"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-3">
                                        <div className="form-group">
                                            <input onClick={handelSubmit} type="submit" value="Save" className="btn btn-success form-control"/>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer/>
        </div>
     );
}

export default AddTable;