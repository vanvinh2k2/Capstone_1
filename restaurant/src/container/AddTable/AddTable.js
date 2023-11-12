import {NavLink, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTable } from '../../action/restaurant';
import { ADD_TABLE } from '../../action/type';

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
            }else alert("Number of Seat have to higher 0!")
            
        }else{
            alert("Please input Title or Number of Seat!");
        }
    }

    return ( 
        <div class="content">
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Tables</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p><NavLink to="/restaurant/table">The Tables</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>Add Table</p>
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
                                                <div class="form-group field-title">
                                                    <div class="row">
                                                        <label class="col-sm-3 text-left" for="id_title">
                                                            Title
                                                            <span class="text-red">* </span>  
                                                        </label>
                                                        <div class=" col-sm-7 field-title">
                                                            <input onChange={e=>setTitle(e.target.value)} className="input" type="text"/>
                                                        </div>
                                                        <label class="col-sm-3 text-left" for="id_title" style={{marginTop: "15px"}}>
                                                            Number of Seat
                                                            <span class="text-red">* </span>  
                                                        </label>
                                                        <div class=" col-sm-7" field-title style={{marginTop: "15px"}}>
                                                            <input onChange={e=>setNumberSeat(e.target.value)} className="input" type="number"/>
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

export default AddTable;