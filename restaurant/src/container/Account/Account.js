import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRestaurantDetail } from '../../action/restaurant';

function Account() {
    const restaurant = useSelector(state=>state.restaurant.restaurant_detail);
    const dispatch = useDispatch();

    useEffect(()=>{
        async function getDetail(){
            const action = await getRestaurantDetail(localStorage.getItem("rid"));
            dispatch(action);
        }
        getDetail();
    }, [])
    console.log(restaurant);
    return ( 
        <div>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>Account</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i className="fas fa-chevron-right"></i>
                    <p>Account</p>
                </div>
                <div className="add-table">

                </div>
            </nav>
            <div className="card bg-light my-4">
                <div className="row">
                    <div className="col-lg-4 my-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img className="rounded rounded-circle" src="https://sohanews.sohacdn.com/2018/11/6/photo-1-1541483747699708526153.jpg" height={200} width={200}/>
                            <b className="my-3">Vinh Ngo</b>
                        </div>
                    </div>
                    <div className="col-lg-8 my-3 px-2">
                        <div className="d-flex align-items-center justify-content-start my-3">
                            <p className="my-1 mx-1">Rid</p>
                            <input className="w-50 input mx-3" type="text" text="username"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Title</p>
                            <input className="w-75 input mx-3" type="text" text="username"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Email</p>
                            <input className="w-75 input mx-3" type="text" text="username"/>
                        </div>
                        <div className="d-flex justify-content-between my-3">
                            <p className="my-1 mx-1">Description</p>
                            <textarea className="w-75 mx-3" rows="8" type="text" text="username"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Phone</p>
                            <input className="w-75 input mx-3" type="text" text="username"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Address</p>
                            <input className="w-75 input mx-3" type="text" text="username"/>
                        </div> 
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Time open</p>
                            <input className="w-75 input mx-3" type="text" text="username"/>
                        </div> 
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Time close</p>
                            <input className="w-75 input mx-3" type="text" text="username"/>
                        </div> 
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Image</p>
                            <input className="w-75 mx-3" type="file" text="username"/>
                        </div> 
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1"></p>
                            <div className="w-75 mx-3">
                                <button className="btn btn-primary px-4 py-1">Save</button>
                            </div>
                        </div> 
                        
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Account;