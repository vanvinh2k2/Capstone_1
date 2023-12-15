import { Navigate } from 'react-router-dom';

const PrivateRoute = ({element}) => {
  let auth = true;
  if(localStorage.getItem("rid") === null){
    auth = false;
  }
  return auth ? element : <Navigate to="/" />
}

export default PrivateRoute;