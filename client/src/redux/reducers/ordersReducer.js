import {
  GET_ORDERS_LIST,
  SET_ORDERS_LOADING,
  GET_ORDERS_ERROR,
  SET_PAGE,
  SET_SORT_BY,
  SET_LIMIT
} from '../actions/types';

const initialState = {
  orders: [],
  total: null,
  limit: 5,
  page: 1,
  pages: null,
  sortBy: "user_email",
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_LIST:
      return {
        ...state,
        orders: action.payload.docs,
        total: action.payload.total,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false,
        error: null
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case SET_ORDERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ORDERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};