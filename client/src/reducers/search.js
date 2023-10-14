import { SEARCH_AI, GET_ERROR } from "../action/types";
const initialState = {
    restaurants: [],
};

export default function(state=initialState, action){
    const {type, payload} = action;
    switch (type){
        case SEARCH_AI:
            return {
                ...state,
                restaurants: payload
            }
        case GET_ERROR:
        default: return state;
    }

}