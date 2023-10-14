import { SEARCH_AI, GET_ERROR } from "./types";
import axios from "axios";

const config = {
    hearders: {
        "Content-type": "application/json"
    }
}

export const searchAI= async(image)=>{
    const formData = new FormData();
    formData.append('image', image);
    try{
        const res = await axios.post(`http://127.0.0.1:8000/api/search-ai/`, formData, config)
        return {
            type: SEARCH_AI,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }

}
