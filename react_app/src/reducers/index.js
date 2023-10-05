import { combineReducers } from 'redux';
import auth from './auth';
import restaurant from './restaurant';
import dish from './dish';

export default combineReducers({
    auth,
    restaurant,
    dish,
});