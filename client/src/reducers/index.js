import { combineReducers } from 'redux';
import auth from './auth';
import restaurant from './restaurant';
import dish from './dish';
import account from './account';
import order from './order';

export default combineReducers({
    auth,
    restaurant,
    dish,
    account,
    order,
});