import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forget_password } from "../../action/auth";
import { useNavigate } from "react-router-dom";
import { FORGET_USER } from "../../action/types";


function ForgetUser(props) {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigable = useNavigate();

    const changeData = (e)=>{
        setEmail(e.target.value);
    }

    const onSubmit = async(e) =>{
        e.preventDefault();
        const action = await forget_password(email);
        dispatch(action);
        if(action.type === FORGET_USER){
            navigable('/login')
        }
    }

    return ( 
        <div>
            <div className="container">
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <div className="login">
                        <div className="login__content forget">
                        <span className="title">Forget Password</span>
                    <form action="" onSubmit={(e) => onSubmit(e)}>
                        <div className="item">
                            <p>Email</p>
                            <input type="text" name='email' onChange={(e)=> changeData(e)}/>
                        </div>
                        <button type="submit">Send</button>
                    </form>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </div>
     );
}

export default ForgetUser;