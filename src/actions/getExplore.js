import _axios from '../lib/axiosConfig';

export const GET_INFO = 'GET_INFO';
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS';
export const GET_INFO_FAIL = 'GET_INFO_FAIL';

export const getExploreInfo = () => (dispatch) => {
  dispatch({ type: GET_INFO });

  _axios
    .get('/explore')
    .then((res) => {
      dispatch({
        type: GET_INFO_SUCCESS,
        payload: {
          users: res.data.users,
        },
      });
    })
    .catch(() => {
      dispatch({ type: GET_INFO_FAIL, error: '에러가 발생했습니다.' });
    });
};
