import axios from 'axios';
import { notify } from './notify';
import { getBookmark } from './getBookmark';

export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
export const CATEGORY_DELETE_FAIL = 'CATEGORY_DELETE_FAIL';

export const deleteCategory = (id) => (dispatch) => {
  axios
    .delete(`/category/${id}`, {
      params: { id },
    })
    .then(() => {
      dispatch({ type: CATEGORY_DELETE_SUCCESS });
    })
    .then(() => {
      dispatch(getBookmark());
    })
    .catch((e) => {
      dispatch({ type: CATEGORY_DELETE_FAIL });
      switch (e.response.status) {
        case 500:
          dispatch(notify(`서버오류`));
          break;
        case 401:
          dispatch(notify('인증되지 않은 사용자입니다.'));
          break;
        default:
          break;
      }
    });
};
