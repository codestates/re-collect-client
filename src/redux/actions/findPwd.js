import _axios from '../lib/axiosConfig';
export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAIL = 'SEND_EMAIL_FAIL';
export const SET_NEW_PWD = 'RSET_NEW_PWD';
export const SET_NEW_PWD_SUCCESS = 'RSET_NEW_PWD_SUCCESS';
export const SET_NEW_PWD_FAIL ='SET_NEW_PWD_FAIL';

export const sendEmail = (email) => async (dispatch) => {
	dispatch({ type: SEND_EMAIL });
	_axios
		.post('/auth/tmp', { email })
		.then(() => {
			dispatch({ type: SEND_EMAIL_SUCCESS });
		})
		.catch(() => {
			dispatch({ type: SEND_EMAIL_FAIL });
		});
};

export const setNewPwd = (email, tempPwd, pwd) => (dispatch) => {
	dispatch({ type : SET_NEW_PWD});
	_axios
		.post(`/auth/pwd?${email}`, {
			tempPwd: tempPwd,
			pwd: pwd,
		})
		.then(() => {
			dispatch({ type : SET_NEW_PWD_SUCCESS});
		})
		.catch(()=>{
			dispatch({ type : SET_NEW_PWD_FAIL });
		})
	
} 