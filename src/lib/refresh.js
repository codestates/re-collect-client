import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../actions/signInOut';
import dayjs from 'dayjs';

const Refresh = async (config) => {
  // const dispatch = useDispatch(); // useDispatch를 사용하면 에러?
  const accessToken = localStorage.getItem('accessToken');
  const expiresAt = localStorage.getItem('expiresAt');
  const now = dayjs(new Date()); // 둘다 format이 되어있는 상태에서 diff를 사용하려하면 에러

  console.log('Dose it works???', now);

  if (now.diff(expiresAt, 'minute') < 0) {
    console.log('It works!@!', now);
    axios
      .get(`https://api.recollect.today/auth/token`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        const newAccessToken = res.data.accessToken;
        localStorage.setItem(`accessToken`, newAccessToken);
        localStorage.setItem(
          'expiresAt',
          dayjs(new Date()).add(15, 'minute').format('YYYY-MM-DD HH:mm:ss')
        );
      })
      .catch(() => {
        // dispatch(logoutThunk());
      });
  }

  return config;
};

export default Refresh;
