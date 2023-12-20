import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { change_account, getRestaurantDetail } from '../../action/restaurant';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CHANGE_RESTAURANT } from '../../action/type';

function Account() {
    const restaurant = useSelector(state=>state.restaurant.restaurant_detail);
    const dispatch = useDispatch();
    const [img, setImg] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        phone: "",
        address: "",
        time_open: "",
        time_close: ""
    })

    const chooseFile = (event) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files[0]) {
            setImg(fileInput.files[0]);
            let reader = new FileReader();
            reader.onload = function (e) {
                const imgProfile = document.querySelector('.img-profile');
                imgProfile.setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
    }

    useEffect(()=>{
        async function getDetail(){
            const action = await getRestaurantDetail(localStorage.getItem("rid"));
            dispatch(action);
        }
        getDetail();
    }, [])

    useEffect(()=>{
        setFormData({
            ...formData,
            title: restaurant.title,
            description: restaurant.description,
            phone: restaurant.phone,
            address: restaurant.address,
            time_open: restaurant.time_open,
            time_close: restaurant.time_close,
        })
    }, [restaurant])

    const changeData = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onsubmit = async(e) =>{
        e.preventDefault();
        const action = await change_account(formData, img, localStorage.getItem("rid"));
        dispatch(action);
        if(action.type === CHANGE_RESTAURANT){
            toast.success("Successful change.");
        }else toast.error(action.payload);
    }

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
                            <img className="rounded rounded-circle img-profile" src={restaurant&&restaurant.image} height={200} width={200}/>
                            <b className="my-3">{restaurant&&restaurant.title}</b>
                        </div>
                    </div>
                    <div className="col-lg-8 my-3 px-2">
                        <div className="d-flex align-items-center justify-content-start my-3">
                            <p className="my-1 mx-1">Rid</p>
                            <input className="w-50 input mx-3" type="text" value={restaurant&&restaurant.rid} disabled/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Title</p>
                            <input className="w-75 input mx-3" type="text" name="title" value={formData.title} onChange={(e)=>changeData(e)}/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Email</p>
                            <input className="w-75 input mx-3" type="text" value={restaurant&&restaurant.email} disabled/>
                        </div>
                        <div className="d-flex justify-content-between my-3">
                            <p className="my-1 mx-1">Description</p>
                            <textarea className="w-75 mx-3" rows="8" type="text" name="description" value={formData.description} onChange={(e)=>changeData(e)}/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Phone</p>
                            <input className="w-75 input mx-3" type="text" name="phone" value={formData.phone} onChange={(e)=>changeData(e)}/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Address</p>
                            <input className="w-75 input mx-3" type="text" name="address" value={formData.address} onChange={(e)=>changeData(e)}/>
                        </div> 
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Time open</p>
                            <input className="w-75 input mx-3" type="text" name="time_open" value={formData.time_open} onChange={(e)=>changeData(e)}/>
                        </div> 
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Time close</p>
                            <input className="w-75 input mx-3" type="text" name="time_close" value={formData.time_close} onChange={(e)=>changeData(e)}/>
                        </div> 
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1">Image</p>
                            <input className="w-75 mx-3" type="file"  onChange={chooseFile}/>
                        </div> 
                        <div className="d-flex align-items-center justify-content-between my-3">
                            <p className="my-1 mx-1"></p>
                            <div className="w-75 mx-3">
                                <button className="btn btn-primary px-4 py-1" onClick={(e)=>onsubmit(e)}>Save</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Account;