import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getBookmark } from './getBookmark';
import handleError from '../lib/errorHandling';

export const CATEGORY_EDIT_START = 'CATEGORY_EDIT_START';
export const CATEGORY_EDIT_END = 'CATEGORY_EDIT_END';
export const CATEGORY_EDIT_SUCCESS = 'CATEGORY_EDIT_END';
export const CATEGORY_EDIT_FAIL = 'CATEGORY_EDIT_FAIL';

export const categoryEditStart = (id, title) => {
  return {
    type: CATEGORY_EDIT_START,
    id,
    title,
  };
};

export const categoryEditEnd = () => ({
  type: CATEGORY_EDIT_END,
});

export const editCategory = (category) => (dispatch) => {
  const { id, title } = category;

  _axios
    .put('/category', { id, title })
    .then(() => {
      dispatch({ type: CATEGORY_EDIT_SUCCESS });
    })
    .then(() => {
      dispatch(getBookmark());
      dispatch(notify(`카테고리 이름을 ${title}(으)로 수정하였습니다`));
    })
    .catch((e) => {
      dispatch({ type: CATEGORY_EDIT_FAIL });
      dispatch(notify(handleError('카테고리 이름 수정', e.response.status)));
    });
};
