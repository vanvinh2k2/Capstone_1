import logo from '../../assets/images/logo1.png';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../action/auth';
import { LOGIN_SUCCESS } from '../../action/type';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        const {email, password} = form;
        e.preventDefault();
        const action = await login(email, password);
        dispatch(action);
        // console.log(action);
        if(action.type === LOGIN_SUCCESS){
            navigate("/restaurant");
        } 
    }

    function handleForm(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        if(localStorage.getItem("token")) navigate("/restaurant");
    }, [])

    return ( 
        <div class="login">
            <div class="login-box">
                <div class="login-logo">
                    <img src={logo} alt="Restaurant Reservation"/>
                </div>
                <div class="card">
                    <div class="card-body">
                    <p class="login-box-msg">Welcome</p>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div class="input-group mb-3">
                            <input type="text" onChange={handleForm} name="email" class="form-control" placeholder="Email"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" onChange={handleForm} name="password" class="form-control" placeholder="Password"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary btn-block">
                                    Log in
                                </button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
   );
}

export default Login;