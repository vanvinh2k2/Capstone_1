import React from "react";
import { useState, useEffect } from "react";
import { login } from "../../action/auth";
import PropTypes from 'prop-types';
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LOGIN_SUCCESS } from "../../action/types";
// import Animation from "../../components/Animation/animation";

function Login(props) {
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
        const {email, password} = formData
        e.preventDefault()
        const action = await login(email, password);
        if(action.type == LOGIN_SUCCESS) setIsChange(true);
        dispatch(action);
    }

    useEffect(() => {
        if (auth.token != null) {
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
                            <input type="text" name='email' onChange={(e)=> changeData(e)}/>
                        </div>
                        <div className="item">
                            <p>Password</p>
                            <input type="password" name='password' onChange={(e)=> changeData(e)}/>
                        </div>
                        <div className="item">
                            <a href="/forget-password">Forgot password?</a>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <div className="login__other">
                        <span>Don't have an Account?</span>
                        <a href="/sign-up">Sign up</a>
                    </div>
                        </div>
                    </div> 
                </div>
            </div>
            {/* <Animation /> */}
        </div>
    );
}

export default Login;