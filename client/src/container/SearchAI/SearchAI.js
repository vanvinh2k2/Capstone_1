import RestaurantSearch from "./RestaurantShow/RestaurantShow";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDishesfromImage } from "../../action/dish";

function SearchAI() {
    const [img, setImg] = useState(null);
    const dispatch = useDispatch();

    function chooseFile(e){
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            setImg(fileInput.files[0]);
            let reader = new FileReader();
            reader.onload = function (e) {
                const imgProfile = document.querySelector('.img-profile');
                imgProfile.setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
    }

    useEffect(()=>{
        async function searchai(){
            if(img){
                const action = await getDishesfromImage(img);
                dispatch(action);
            }
        }
        searchai();
    }, [img])

    return ( 
        <>
            <div className="container">
                <div className="row searchai">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <h3>Search Dish with Image</h3>
                    </div>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <div className="searchai__input">
                            <div className="searchai__input__img">
                                {img?
                                <img src="" className="img-profile"/>
                                :<p>Please Choice Image</p>
                                }
                            </div>
                            <button className="btn">Upload<input type="file" onChange={chooseFile}/></button>
                        </div>
                    </div>
                </div>
            </div>
            {img?<RestaurantSearch/>:""}
        </>
     );
}

export default SearchAI;