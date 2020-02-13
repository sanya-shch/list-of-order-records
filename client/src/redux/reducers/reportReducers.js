import {
  SET_REPORT_LOADING,
  GET_REPORT_ERROR
} from '../actions/types';

const initialState = {
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORT_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case GET_REPORT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};