import axios from 'axios';
import { getBookmark } from './bookmark';
import { notify } from './notify';

export const deleteCategory = (id) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  axios
    .delete(`https://api.recollect.today/category/${id}`, {
      params: { id },
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
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