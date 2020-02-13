import axios from 'axios';

import {
  SET_SELECTED_FILE,
  SET_FILE_LOADING,
  GET_FILE_ERROR
} from './types';
import {getOrdersList} from "./orderActions";

export const setSelectedFile = ( file ) => {
  return {
    type: SET_SELECTED_FILE,
    payload: file
  };
};

export const postSelectedFile = ( file ) => (dispatch, getState) => {
  const { page, limit, sortBy } = getState().orders;
  dispatch(setLoading());

  let formData = new FormData();
  formData.append('filedata', file);

  axios
    .post('http://localhost:5000/fileupload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then(() => dispatch(getOrdersList({page, limit, sortBy})) )
    .then(() => {
      dispatch({
        type: SET_FILE_LOADING
      });
    })
    .catch(err => {
      if (err.response && err.response) {
        dispatch({
          type: GET_FILE_ERROR,
          payload: err.response.data.message
        });
      }
    });
};

export const setLoading = () => {
  return {
    type: SET_FILE_LOADING
  };
};