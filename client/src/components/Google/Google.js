import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import img from '../../assets/images/google.png';
import { login_google } from '../../action/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_SUCCESS } from '../../action/types';

function Google() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try{
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers:{ Authorization: `Bearer ${tokenResponse.access_token}`,},
                    }
                )
                const infor = res.data;
                const action = await login_google(infor.name, infor.email, infor.picture, infor.name, infor.sub)
                dispatch(action);
                if (action.type === LOGIN_SUCCESS) {
                    navigate('/');
                }
            }
            catch (e){
                console.log(e);
            }
        },
    })
  return <button onClick={()=> login()}> 
    <img src={img}/>
    Log in with Google
  </button>
}
export default Google;
