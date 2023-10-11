import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { listLike, deleteLike } from "../../action/restaurant";
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
            e.currentTarget.getAttribute('value')
        );
        console.log(action)
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
                            {likes.map((like, index)=>{
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
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
     );
}

export default LikeRestaurant