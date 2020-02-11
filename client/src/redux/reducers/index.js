import { combineReducers } from 'redux';
import ordersReducer from './ordersReducer';
import fileReducers from "./fileReducers";

export default combineReducers({
  orders: ordersReducer,
  file: fileReducers
});