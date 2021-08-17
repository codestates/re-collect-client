import {
  CATEGORY_EDIT_START,
  CATEGORY_EDIT_END,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
} from '../actions/editCategory'
import {CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAIL} from '../actions/deleteCategory'

const initialState = {
  isCategoryEdit: false,
  id: '',
  title: '',
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_EDIT_FAIL:
    case CATEGORY_DELETE_FAIL:
      return {
        ...state,
        isCategoryEdit: true,
      };

    case CATEGORY_EDIT_START:
      return {
        ...state,
        isCategoryEdit: true,
        id: action.id,
        title: action.title,
      };

    case CATEGORY_EDIT_SUCCESS:
    case CATEGORY_DELETE_SUCCESS:
    case CATEGORY_EDIT_END:
      return {
        isCategoryEdit: false,
        id: '',
        title: '',
      };

    default:
      return state;
  }
};