/* eslint-disable indent */
import _axios from '../lib/axiosConfig';
import handleError from '../lib/errorHandling';

export const SIGNUP_INITIALIZE = 'SIGNUP_INITIALIZE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const SIGNUP_EMAIL_VALIDATION_SUCCESS =
	'SIGNUP_EMAIL_VALIDATION_SUCCESS';
export const SIGNUP_EMAIL_VALIDATION_FAIL = 'SIGNUP_EMAIL_VALIDATION_FAIL';
export const SIGNUP_USERNAME_VALIDATION_SUCCESS =
	'SIGNUP_USERNAME_VALIDATION_SUCCESS';
export const SIGNUP_USERNAME_VALIDATION_FAIL =
	'SIGNUP_USERNAME_VALIDATION_FAIL';

export const EMAIL_VALIDATION_INITIALIZE = 'EMAIL_VALIDATION_INITIALIZE';
export const USERNAME_VALIDATION_INITIALIZE = 'USERNAME_VALIDATION_INITIALIZE';

export const signupInitialize = () => ({
	type: SIGNUP_INITIALIZE,
});

export const signupThunk = (signUpInfo) => async (dispatch) => {
	const { username, pwd } = signUpInfo;
	const email = signUpInfo.email + '@' + signUpInfo.emailService.value;
	try {
		// eslint-disable-next-line no-unused-vars
		const result = await _axios.post(
			'/signup',
			{
				username,
				pwd,
				email,
			},
			{
				headers: { 'Content-Type': 'application/json' },
			}
		);

		dispatch({ type: SIGNUP_SUCCESS });
	} catch (e) {
		dispatch({
			type: SIGNUP_FAIL,
			error: handleError('회원가입', e.response.status),
		});
	}
};

export const validationInitialize = (name) => (dispatch) => {
	switch (name) {
	case 'email':
		dispatch({ type: EMAIL_VALIDATION_INITIALIZE });
		break;
	case 'username':
		dispatch({ type: USERNAME_VALIDATION_INITIALIZE });
		break;
	default:
		return;
	}
};

export const emailValidation = (email) => (dispatch) => {
	_axios
		.post(
			'/auth/email',
			{ email },
			{ headers: { 'Content-Type': 'application/json' } }
		)
		.then(() => {
			dispatch({ type: SIGNUP_EMAIL_VALIDATION_SUCCESS });
		})
		.catch((e) => {
			dispatch({
				type: SIGNUP_EMAIL_VALIDATION_FAIL,
				error: handleError('이메일 검증', e.response.status),
			});
		});
};

export const usernameValidation = (username) => (dispatch) => {
	_axios
		.post(
			'/auth/username',
			{ username },
			{ headers: { 'Content-Type': 'application/json' } }
		)
		.then(() => {
			dispatch({ type: SIGNUP_USERNAME_VALIDATION_SUCCESS });
		})
		.catch((e) => {
			dispatch({
				type: SIGNUP_USERNAME_VALIDATION_FAIL,
				error: handleError('유저네임 검증', e.response.status),
			});
		});
};
