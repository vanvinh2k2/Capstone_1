import facebookimg from '../../assets/images/facebook.png'
import googleimg from '../../assets/images/google.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../action/auth';
import { SIGNUP_SUCCESS } from '../../action/types';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const changeData = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e)=>{
        e.preventDefault()
        const {name, email, password, password2} = formData;
        const action = await signup(name, email, password, password2);
        dispatch(action)
        if(action.type == SIGNUP_SUCCESS){
            navigate('/')
        }
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
                                <button type="submit">Login</button>
                            </form>
                            <span>Or login with</span>
                            <button className="google">
                                <img src={googleimg}/>
                                <span>Continue with Google</span>
                            </button>
                            <button className="facebook">
                                <img src={facebookimg}/>
                                <span>Continue with Facebook</span>
                            </button>
                            <div className="signup__other">
                                <span>Alreadly have an Account?</span>
                                <a href="/login">Sign in</a>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
     );
}

export default SignUp;