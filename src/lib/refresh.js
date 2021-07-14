// import axios, { AxiosRequestConfig } from 'axios';
// // import moment from "moment";
// import { useDispatch } from 'react-redux';
// import { logoutThunk } from '../modules/sign';

// export const Refresh = async () => {
//   const dispatch = useDispatch();
//   const expireAt = localStorage.getItem('expiresAt');
//   const accessToken = localStorage.getItem('accessToken');

//   if (moment(expireAt).diff(moment()) < 0) {
//     axios
//       .get(`https://api.recollect.today/auth/token`, {
//         headers: { authorization: `Bearer ${accessToken}` },
//         withCredentials: true,
//       })
//       .then((res) => {
//         console.log(res); // 응답확인
//         const newAccessToken = res.data.accessToken;
//         localStorage.setItem(`accessToken`, newAccessToken);
//         localStorage.setItem(
//           'expiresAt',
//           moment().add(1, 'hour').format('yyyy-mm-dd HH:mm:ss')
//         );
//       })
//       .catch(() => {
//         dispatch(logoutThunk());
//       });
//   }
// };
