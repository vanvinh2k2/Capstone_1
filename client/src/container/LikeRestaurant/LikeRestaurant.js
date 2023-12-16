import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { listLike, deleteLike } from "../../action/restaurant";
import img from '../../assets/images/empty2.png';
import 'react-toastify/dist/ReactToastify.css';
import { DEL_LIKE } from "../../action/types";
import { toast, ToastContainer } from "react-toastify";

function LikeRestaurant() {
    const dispatch = useDispatch();
    const likes = useSelector(state=>state.restaurant.likes);
    useEffect(()=>{
        async function getLikes(){
            const action = await listLike(localStorage.getItem("iduser"));
            dispatch(action);
        }
        getLikes();
    }, [])

    async function handelDelete(e){
        const action = await deleteLike(
            localStorage.getItem("iduser"),
            e.currentTarget.getAttribute('value'),
            localStorage.getItem("access")
        );
        if(action.type === DEL_LIKE) toast.success("Delete like successfully.");
        else toast.error("Like not exists!");
        dispatch(action);
    }
    return ( 
        <div className="container">
            <div className="row">
                <div className="like__restaurant">
                    <h3>Like Restaurant</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Rid</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Contact</th>
                                <th>Time Open</th>
                                <th>Time Close</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {likes.length>0?likes.map((like, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{like.restaurant?like.restaurant.rid: ""}</td>
                                        <td><span>{like.restaurant?like.restaurant.title: ""}</span></td>
                                        <td><img src={`${like.restaurant?like.restaurant.image: ""}`}/></td>
                                        <td>{like.restaurant?like.restaurant.contact: ""}</td>
                                        <td>{like.restaurant?like.restaurant.time_open: ""}</td>
                                        <td>{like.restaurant?like.restaurant.time_close: ""}</td>
                                        <td>
                                            <a href={`/detail-restaurant/${like.restaurant?like.restaurant.rid: ""}/`}><i className="fas fa-eye"></i></a>
                                            <i className="fas fa-trash" value={like.restaurant?like.restaurant.rid: ""} onClick={handelDelete}></i>
                                        </td>
                                    </tr>
                                )
                            }):<tr role="row">
                            <td colSpan={7} className="text-center">
                                <img src={img} style={{marginTop: '60px', marginBottom: '40px'}}/>
                                <h6 className="text-secondary" style={{marginBottom: '85px'}}>There are no favorite restaurants yet</h6>
                            </td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer/>
        </div>
     );
}

export default LikeRestaurant