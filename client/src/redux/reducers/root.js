/**
 *  Importing reducers and combining as ONE REDUCER
 */
import user from './userReducer';
import profile from './profileReducer'
import {combineReducers} from 'redux';


const root = combineReducers({
user,
profile
})

export default root;