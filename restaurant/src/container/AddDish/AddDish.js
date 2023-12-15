import {NavLink, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, addDish } from '../../action/restaurant';
import { ADD_DISH } from '../../action/type';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddDish() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const category = useSelector(state=>state.restaurant.category);
    const [form, setForm] = useState({
        title: "",
        image: null,
        description: "",
        price: 0,
        old_price: 0,
        product_status: "draft",
        specifications: "",
        featured: false,
        digital: false,
        cid: ""
    });

    useEffect(()=>{
        async function getcategory(){
            const action = await getCategory(localStorage.getItem('rid'))
            dispatch(action);
        }
        getcategory();
    }, [])

    function handelChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    function handelChoice(e){
        let file = e.target;
        if(file.files &&file.files[0]){
            setForm({...form, ['image']: file.files[0]});
        }
    }

    function handelCheck(e){
        setForm({...form, [e.target.name]: e.target.checked});
    }

    async function handelsubmit(e){
        e.preventDefault();
        if(checkInput()){
            const action = await addDish(localStorage.getItem('rid'), form);
            dispatch(action);
            if(action.type === ADD_DISH){
                navigate("/restaurant/dish");
            }
        }
    }

    function checkInput(){
        if(form.title === ""){
            toast.error("Please input Title!");
            return false;
        }else
        if(form.image === null){
            toast.error("Please choice Image!");
            return false;
        }else if(form.description === ""){
            toast.error("Please input description!");
            return false;
        }else if(form.cid === ""){
            toast.error("Please choice Category!");
            return false;
        }return true;
    }

    return ( 
        <div className="content">
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>The Dishes</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i className="fas fa-chevron-right"></i>
                    <p><NavLink to="/restaurant/dish">The Dishes</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>Add Dish</p>
                </div>
                <div className="add-dish">
                </div>
            </nav>
            <div className="container-fluid">
                <section className="content">
                    <div className="row">
                        <div id="content-main">
                                <div className="row">
                                    <div className="col-12 col-lg-9">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="form-group field-title">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left">
                                                            Title
                                                            <span className="text-red">* </span>  
                                                        </label>
                                                        <div className=" col-sm-7 field-title">
                                                            <input onChange={handelChange} className="input" type="text" name="title"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group field-image">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left">
                                                            Image
                                                            <span className="text-red">* </span>
                                                        </label>
                                                        <div className=" col-sm-7 field-image">
                                                            <input onChange={handelChoice} type="file" name="image"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group field-description">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left">
                                                            Description
                                                        </label>
                                                        <div className=" col-sm-7 field-description">
                                                            <textarea onChange={handelChange} type="number" name="description" rows="5"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group field-price">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left">
                                                            Price
                                                            <span className="text-red">* </span>
                                                        </label>
                                                        <div className=" col-sm-7 field-price">
                                                            <input onChange={handelChange} className="input" min="1" type="number" name="price"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group field-old_price">
                                                    <div className="row">
                                                            <label className="col-sm-3 text-left">
                                                                Old price
                                                                <span className="text-red">* </span>
                                                            </label>
                                                            <div className="col-sm-7 field-old_price">
                                                                <input onChange={handelChange} className="input" min="1" type="number" name="old_price"/>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div className="form-group field-product_status">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left">
                                                            Product status
                                                            <span className="text-red">* </span>
                                                        </label>
                                                        <div className="col-sm-7 field-product_status">
                                                            <select onChange={handelChange} className="input" name="product_status">
                                                                <option value="draft" data-select2-id="select2-data-2-4k8x">Draft</option>
                                                                <option value="disabled">Disabled</option>
                                                                <option value="rejected">Rejected</option>
                                                                <option value="in_review">In review</option>
                                                                <option value="published">Published</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group field-featured">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left">
                                                            Featured
                                                        </label>
                                                        <div className="col-sm-7 field-featured">
                                                            <input onChange={handelCheck} type="checkbox" name="featured"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group field-digital">
                                                    <div className="row">   
                                                        <label className="col-sm-3 text-left">
                                                            Digital
                                                        </label>
                                                        <div className="col-sm-7 field-digital">
                                                            <input onChange={handelCheck} type="checkbox" name="digital"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group field-category">
                                                    <div className="row">
                                                        <label className="col-sm-3 text-left" htmlFor="id_category">
                                                            Category
                                                            <span className="text-red">* </span>
                                                        </label>
                                                        <div className="col-sm-7 field-category">
                                                            <div className="related-widget-wrapper" >
                                                                <select onChange={handelChange} className="input" name="cid">
                                                                    <option value="" selected="">---------</option>
                                                                    {category?category.map((item, index)=>{
                                                                        return (
                                                                            <option key={index} value={item.cid}>{item.title}</option>
                                                                        )
                                                                    }):""}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-3">
                                        <div className="form-group">
                                            <input onClick={handelsubmit} type="submit" value="Save" className="btn btn-success form-control"/>
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

export default AddDish;