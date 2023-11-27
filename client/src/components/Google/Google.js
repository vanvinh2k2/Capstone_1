import axios from 'axios';
// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import img from '../../assets/images/google.png';

function Google() {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try{
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers:{
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                )
                console.log(res);
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
