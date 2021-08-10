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