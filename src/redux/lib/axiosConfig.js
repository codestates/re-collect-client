import axios from 'axios';
// import dayjs from 'dayjs';

const baseURL = 'https://api.recollect.today';

const _axios = axios.create({
	baseURL: process.env.SERVER_BASE_URL || baseURL,
	headers: {
		withCredentials: true,
	},
});

_axios.interceptors.request.use(async (config) => {
	const accessToken = localStorage.getItem('accessToken');
	// const expiresAt = localStorage.getItem('expiresAt');
	// const now = dayjs(new Date());
	// // 토큰 갱신 //
	// if (now.diff(expiresAt, 'minute') < 0) {
	// 	axios
	// 		.get('https://api.recollect.today/auth/token', {
	// 			headers: { authorization: `Bearer ${accessToken}` },
	// 			withCredentials: true,
	// 		})
	// 		.then((res) => {
	// 			console.log('res is ', res); // =>
	// 			// const newAccessToken = res.data.accessToken;
	// 			// localStorage.setItem('accessToken', newAccessToken);
	// 			// localStorage.setItem(
	// 			// 	'expiresAt',
	// 			// 	dayjs(new Date()).add(15, 'minute').format('YYYY-MM-DD HH:mm:ss')
	// 			// );
	// 		})
	// 		.catch(() => {
	// 			console.log('hello wolrd');
	// 			localStorage.removeItem('accessToken');
	// 			localStorage.removeItem('expiresAt');
	// 		});
	// }
	// 토큰 설정 //
	if (accessToken) {
		config.headers.authorization = `Bearer ${localStorage.getItem(
			'accessToken'
		)}`;
	}
	return config;
});

export default _axios;
