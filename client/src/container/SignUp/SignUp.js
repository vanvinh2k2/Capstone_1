import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../action/auth';
import { SIGNUP_SUCCESS } from '../../action/types';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeData = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e)=>{
        e.preventDefault()
        const {name, email, password, password2} = formData;
        if(checkInput(formData)){
            const action = await signup(name, email, password, password2);
            dispatch(action)
            if(action.type == SIGNUP_SUCCESS){
                navigate('/');
            }else toast.error(action.payload);
        }
    }

    function checkInput(formData){
        const {name, email, password, password2} = formData
        if(name === ""){
            toast.error("Please input Name!");
            return false;
        }else if(email === ""){
            toast.error("Please input Email!");
            return false;
        } else if(password === ""){
            toast.error("Please input Password!");
            return false;
        } else if(password2 === ""){
            toast.error("Please input Re-password!");
            return false;
        } return true;
    }

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <div className="signup">
                        <div className="signup__content">
                        <span className="title">Create an Account</span>
                            <form action="" onSubmit={(e)=>onSubmit(e)}>
                                <div className="item">
                                    <p>Username</p>
                                    <input type="text" name="name" onChange={(e)=>changeData(e)}/>
                                </div>
                                <div className="item">
                                    <p>Email</p>
                                    <input type="text" name="email" onChange={(e)=>changeData(e)}/>
                                </div>
                                <div className="item">
                                    <p>Password</p>
                                    <input type="password" name="password" onChange={(e)=>changeData(e)}/>
                                </div>
                                <div className="item">
                                    <p>Confirm Password</p>
                                    <input type="password" name="password2" onChange={(e)=>changeData(e)}/>
                                </div>
                                <button type="submit">Register</button>
                            </form>
                            <div className="signup__other">
                                <span>Alreadly have an Account?</span>
                                <a href="/login">Sign in</a>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            <ToastContainer/>
        </div>
     );
}

export default SignUp;