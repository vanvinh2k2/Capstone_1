import {NavLink, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailTable, updateTable } from '../../action/restaurant';
import {useParams} from 'react-router-dom'
import { UPDATE_TABLE } from '../../action/type';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateTable() {
    const dispatch = useDispatch();
    const {tid} = useParams();
    const [title, setTitle] = useState("");
    const [numberSeat, setNumberSeat] = useState(0);
    const table = useSelector(state=>state.restaurant.table);
    const navigate = useNavigate();

    async function handelSubmit(e){
        e.preventDefault();
        if(title !== "" && numberSeat!==""){
            if(numberSeat > 0){
                const action = await updateTable(tid, title, numberSeat);
                dispatch(action);
                if(action.type === UPDATE_TABLE){
                    navigate('/restaurant/table')
                }
            }else toast.error("Number of Seat have to higher 0!");
        }else toast.error("Please input Title or Number of Seat!");
        
    }

    useEffect(()=>{
        setTitle(title)
        async function getDetailTable(){
            const action = await detailTable(tid);
            dispatch(action);
        }
        getDetailTable();
    }, [])

    useEffect(()=>{
        setTitle(table.title);
        setNumberSeat(table.number_seat);
    }, [table])

    return ( 
        <div>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Tables</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i className="fas fa-chevron-right"></i>
                    <p><NavLink to="/restaurant/table">The Tables</NavLink></p>
                    <i className="fas fa-chevron-right"></i>
                    <p>Update Table</p>
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
                                                <div className="form-group field-did">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left" for="id_did">
                                                            Tid
                                                            <span className="text-red">* </span> 
                                                        </label>
                                                        <div className=" col-sm-7 field-did ">
                                                            <input className="input" type="text" value={table?table.tid:""} disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group field-title">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left">
                                                            Title
                                                            <span className="text-red">* </span>  
                                                        </label>
                                                        <div className=" col-sm-7 field-title">
                                                            <input onChange={e=>setTitle(e.target.value)} value={title} className="input" type="text"/>
                                                        </div>
                                                        <label className="col-sm-3 text-left" style={{marginTop: "15px"}}>
                                                            Number of Seat
                                                            <span className="text-red">* </span>  
                                                        </label>
                                                        <div className=" col-sm-7 field-title" style={{marginTop: "15px"}}>
                                                            <input onChange={e=>setNumberSeat(e.target.value)} value={numberSeat} className="input" type="number"/>
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

export default UpdateTable;