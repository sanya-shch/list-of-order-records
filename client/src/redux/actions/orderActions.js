import axios from 'axios';

import {
  GET_ORDERS_LIST,
  SET_ORDERS_LOADING,
  GET_ORDERS_ERROR,
  SET_PAGE,
  SET_SORT_BY,
  SET_LIMIT
} from './types';

export const getOrdersList = ({ page, limit, sortBy }) => dispatch => {
  dispatch(setLoading());

  axios
    .get(`http://localhost:5000/getorderslist?page=${page}&limit=${limit}&sortBy=${sortBy}`)
    .then(res => {
      dispatch({
        type: GET_ORDERS_LIST,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response && err.response) {
        dispatch({
          type: GET_ORDERS_ERROR,
          payload: err.response.data.message
        });
      }
    });
};

export const setLoading = () => {
  return {
    type: SET_ORDERS_LOADING
  };
};

export const setPage = ( page ) => {
  return {
    type: SET_PAGE,
    payload: page
  };
};

export const setSortBy = ( sortBy ) => {
  return {
    type: SET_SORT_BY,
    payload: sortBy
  };
};

export const setLimit = ( limit ) => {
  return {
    type: SET_LIMIT,
    payload: limit
  };
};