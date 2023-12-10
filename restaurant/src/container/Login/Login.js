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
        if(localStorage.getItem("rid") !== null) navigate("/restaurant");
    }, [])

    return ( 
        <div className="login">
            <div className="login-box">
                <div className="login-logo">
                    <img src={logo} alt="Restaurant Reservation"/>
                </div>
                <div className="card">
                    <div className="card-body">
                    <p className="login-box-msg">Welcome</p>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div className="input-group mb-3">
                            <input type="text" onChange={handleForm} name="email" className="form-control" placeholder="Email"/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" onChange={handleForm} name="password" className="form-control" placeholder="Password"/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block">
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