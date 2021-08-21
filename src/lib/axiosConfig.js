import axios from 'axios';
import dayjs from 'dayjs';

const baseURL = 'https://api.recollect.today';

const _axios = axios.create({
  baseURL: process.env.SERVER_BASE_URL || baseURL,
  headers: {
    withCredentials: true,
  },
});

_axios.interceptors.request.use(async (config) => {
  // const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const expiresAt = localStorage.getItem('expiresAt');
  const now = dayjs(new Date()); // 둘다 format이 되어있는 상태에서 diff를 사용하려하면 에러
  // 토큰 갱신 //
  if (now.diff(expiresAt, 'minute') < 0) {
    axios
      .get(`https://api.recollect.today/auth/token`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        console.log('res is ', res); // => Todo : 새로운 accessToken을 찾을 수 없음(확인필요)
        const newAccessToken = res.data.accessToken;
        localStorage.setItem(`accessToken`, newAccessToken);
        localStorage.setItem(
          'expiresAt',
          dayjs(new Date()).add(15, 'minute').format('YYYY-MM-DD HH:mm:ss')
        );
      })
      .catch(() => {
        // useDispatch를 interceptor 안에서 사용하면 에러발생하기 때문에 직접로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiresAt');
      });
  }
  // 토큰 설정 //
  if (accessToken) {
    config.headers.authorization = `Bearer ${localStorage.getItem(
      'accessToken'
    )}`;
  }
  return config;
});

export default _axios;
