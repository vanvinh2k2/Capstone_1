import { Navigate } from 'react-router-dom';
import { checkAccessToken } from '../action/auth';
import { TOKEN_VALID } from '../action/types';

const isAccessTokenValid = async (accessToken) =>{
  // Kiểm tra thời hạn của Access Token
  const action = await checkAccessToken(accessToken)
  if(action.type === TOKEN_VALID) return true;
  return false;
}

const PrivateRoute = ({element}) => {
    let auth = true;
    const refreshToken1 = localStorage.getItem("refresh");

    if(refreshToken1!==null){
        isAccessTokenValid(refreshToken1).then((res) => {
          if (res) {} 
          else { auth = false; }
        })
        .catch((error) => {
          console.error(error);
        });
    }else auth = false;

    return auth ? element : <Navigate to="/login" />
}

export default PrivateRoute;