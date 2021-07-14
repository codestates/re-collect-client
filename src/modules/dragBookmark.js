import axios from 'axios';
import { getBookmark } from './bookmark';
import { notify } from './notification';

export const dragBookmark =
  ({ dragId, dropId, categoryId, originalCategory, changingCategory }) =>
  (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(dragId, dropId);

    axios
      .patch(
        `https://api.recollect.today/bookmarks/${dragId}/${dropId}/positions`,
        { categoryId },
        {
          params: {
            dragId,
            dropId,
          },
          headers: {
            authorizaiton: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(getBookmark());
      })
      .then(() => {
        if (originalCategory === changingCategory) {
          dispatch(notify('북마크가 이동되었습니다'));
        } else {
          dispatch(
            notify(
              `${originalCategory}에서 ${changingCategory}(으)로 북마크가 이동되었습니다`
            )
          );
        }
      })
      .catch(() => {
        dispatch(notify('오류가 발생하였습니다 새로고침해 주세요!'));
      });
  };

export const dragBookmarkToLast =
  ({ dragId, categoryId, originalCategory, changingCategory }) =>
  (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    axios
      .patch(
        `https://api.recollect.today/bookmarks/${dragId}/positions`,
        { categoryId },
        {
          headers: {
            authorizaiton: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(getBookmark());
      })
      .then(() => {
        if (originalCategory === changingCategory) {
          dispatch(notify('북마크가 이동되었습니다'));
        } else {
          dispatch(
            notify(
              `${originalCategory}에서 ${changingCategory}(으)로 북마크가 이동되었습니다`
            )
          );
        }
      })
      .catch(() => {
        dispatch(notify('오류가 발생하였습니다 새로고침해 주세요!'));
      });
  };
