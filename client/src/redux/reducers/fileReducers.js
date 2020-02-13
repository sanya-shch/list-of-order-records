import {
  SET_SELECTED_FILE,
  SET_FILE_LOADING,
  GET_FILE_ERROR
} from '../actions/types';

const initialState = {
  loading: false,
  selectedFile: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_FILE:
      return {
        ...state,
        selectedFile: action.payload,
        error: null
      };
    case SET_FILE_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case GET_FILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};