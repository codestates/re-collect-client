import axios from 'axios';

export const GET_INFO = 'GET_INFO';

export const getExploreInfo = () => (dispatch) => {
  axios.get('/explore').then((res) => {
    dispatch({
      type: GET_INFO,
      payload: {
        users: res.data.users,
      },
    });
  });
};
