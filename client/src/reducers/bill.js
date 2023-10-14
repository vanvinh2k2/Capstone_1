import {
   GET_BILL,
   GET_ERROR,
   GET_ORDER_HISTORY
} from '../action/types';

const initialState = {
    bill: {},
    orderHistory: []
};

export default function (state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_BILL:
            return {
                ...state,
                bill: payload
            }
        case GET_ORDER_HISTORY:
            return{
                ...state,
                orderHistory: payload
            }
        case GET_ERROR:
        default: return state
    }

}