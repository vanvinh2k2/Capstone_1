import React from "react";
import { useState, useEffect } from "react";
import { login } from "../../action/auth";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import Facebook from "../../components/Facebook/Facebook";
import { LOGIN_SUCCESS } from "../../action/types";
import Google from "../../components/Google/Google";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    let navigate = useNavigate()
    let [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    let auth = useSelector(state=>state.auth)
    const [isChange, setIsChange] = useState(false)

    const changeData = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e) =>{
        const {email, password} = formData;
        e.preventDefault();
        if(checkInput(formData)){
            const action = await login(email, password);
            if(action.type == LOGIN_SUCCESS){
                setIsChange(true);
            }else{
                toast.error(action.payload)
            }
            dispatch(action);
        }
    }

    function checkInput(formData){
        const {email, password} = formData
        if(email === ""){
            toast.error("Please input Email!");
            return false;
        }else if(password === ""){
            toast.error("Please input Password!");
            return false;
        } return true;
    }

    useEffect(() => {
        if (auth.access !== null) {
            navigate('/');
        }
    }, [isChange]);
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <div className="login">
                        <div className="login__content">
                        <span className="title">Sign in Account</span>
                    <form action="" onSubmit={(e) => onSubmit(e)}>
                        <div className="item">
                            <p>Email</p>
                            <input type="text" name='email' placeholder="example@gmail.com" onChange={(e)=> changeData(e)}/>
                        </div>
                        <div className="item">
                            <p>Password</p>
                            <input type="password" name='password' placeholder="12345At/" onChange={(e)=> changeData(e)}/>
                        </div>
                        <div className="item">
                            <a href="/forget-password">Forgot password?</a>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <span>Or login with</span>
                            <button className="google">
                                <GoogleOAuthProvider clientId="571607333156-s32hv503iaiac6joh5kqh339lhoaiurq.apps.googleusercontent.com">
                                    <Google/>
                                </GoogleOAuthProvider>
                            </button>
                            <Facebook/>
                    <div className="login__other">
                        <span>Don't have an Account?</span>
                        <a href="/sign-up">Sign up</a>
                    </div>
                        </div>
                    </div> 
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Login;