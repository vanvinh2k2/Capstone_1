import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from "../../action/restaurant";
import img from '../../assets/images/empty.png'

function Review() {
    const reviews = useSelector(state=>state.restaurant.reviews);
    const dispatch = useDispatch();
    const RATING = [
        "★☆☆☆☆",
        "★★☆☆☆",
        "★★★☆☆",
        "★★★★☆",
        "★★★★★"
    ];

    useEffect(()=>{
        async function getreviews(){
            const action  = await getReviews(localStorage.getItem('rid'))
            dispatch(action);
        }
        getreviews();
    }, [])

    return ( 
        <div>
            <nav className='nav-header'>
                <i className="fas fa-list"></i>
                <i className="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
            <div className="view-link">
                    <p className='top'>Reviews</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i className="fas fa-chevron-right"></i>
                    <p>Reviews</p>
                </div>
                <div className="add-review">
                    
                </div>
            </nav>
            <div className="card table-responsive">
                <table id="result_list" className="table table-striped">
                    <thead>
                        <tr>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p href="#">User</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p href="#">Email</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p href="#">Review</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p href="#">Rating</p>
                                </div>
                            </th>
                            <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                <div className="text">
                                    <p href="#">Date</p>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews&&reviews.length>0? reviews.map((item, index)=>{
                            return (
                                <tr role="row" className="even" key={index}>
                                    <th>{item.user.username}</th>
                                    <td>{item.user.email}</td>
                                    <td>{item.review}</td>
                                    <td>{RATING[item.rating - 1]}</td>
                                    <td>{item.date.substring(0,10)}</td>
                                </tr>
                            )
                        })
                        : <tr role="row">
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

export default Review;