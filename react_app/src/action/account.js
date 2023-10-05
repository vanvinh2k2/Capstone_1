import { CHANGE_ACCOUNT, GET_DASHBOARD } from "./types";

export const change_account = () =>{
    const config = {
        headers:{
            "Content-type": "application/json",
        }
        
    }
    return {
        type: CHANGE_ACCOUNT,
        payload: res.data.data
    }
}