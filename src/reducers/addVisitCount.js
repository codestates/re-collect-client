import initialState from './initialState';
import {
  ADD_VISITCOUNT,
  ADD_VISITCOUNT_SUCCESS,
  ADD_VISITCOUNT_FAIL,
} from '../actions/addVisitCount';

export const visitCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VISITCOUNT:
      return {
        ...state,
        visitCounts: {
          isLoading: true,
          error: null,
        },
      };
    case ADD_VISITCOUNT_SUCCESS:
      return {
        ...state,
        visitCounts: {
          isLoading: false,
          error: null,
        },
      };
    case ADD_VISITCOUNT_FAIL:
      return {
        ...state,
        visitCounts: {
          isLoading: false,
          error: action.error,
        },
      };
    default:
      return null;
  }
};
