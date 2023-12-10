import { LoginSocialFacebook } from 'reactjs-social-login';
import {FacebookLoginButton} from 'react-social-login-buttons';
import { login_facebook } from '../../action/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Facebook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <button className="facebook">
            <LoginSocialFacebook appId='1031677288051894'
            onResolve={async (res)=>{

                console.log(res.data);
                const infor = res.data;
                // const action = await login_facebook(infor.name, infor.email, infor.picture, infor.name, infor.sub)
                // dispatch(action);
                // if (action.type === LOGIN_SUCCESS) {
                //     navigate('/');
                // }
                
            }}
            onReject={(err)=>{
                console.log(err);
            }}>
                <FacebookLoginButton/>
            </LoginSocialFacebook>
        </button>
     );
}

export default Facebook;