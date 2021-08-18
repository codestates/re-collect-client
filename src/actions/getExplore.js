import _axios from '../lib/axiosConfig';

export const GET_INFO = 'GET_INFO';

export const getExploreInfo = () => (dispatch) => {
  _axios.get('/explore').then((res) => {
    dispatch({
      type: GET_INFO,
      payload: {
        users: res.data.users,
      },
    });
  });
};
