import axios from 'axios';

import {
  SET_REPORT_LOADING,
  GET_REPORT_ERROR
} from './types';

export const getReport = () => dispatch => {
  dispatch(setLoading());

  axios
    .get('http://localhost:5000/getreport')
    .then(() => {
      dispatch({
        type: SET_REPORT_LOADING
      });
    })
    .catch(err => {
      if (err.response && err.response) {
        dispatch({
          type: GET_REPORT_ERROR,
          payload: err.response.data.message
        });
      }
    });
};

export const setLoading = () => {
  return {
    type: SET_REPORT_LOADING
  };
};