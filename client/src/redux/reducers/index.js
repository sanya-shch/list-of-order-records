import { combineReducers } from 'redux';
import ordersReducer from './ordersReducer';
import fileReducers from "./fileReducers";
import reportReducers from "./reportReducers";

export default combineReducers({
  orders: ordersReducer,
  file: fileReducers,
  report: reportReducers
});