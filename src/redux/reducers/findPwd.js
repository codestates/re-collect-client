/* eslint-disable indent */
import initialState from './initialState';
import {
	SEND_EMAIL,
	SEND_EMAIL_SUCCESS,
	SEND_EMAIL_FAIL,
	SET_NEW_PWD,
	SET_NEW_PWD_SUCCESS,
	SET_NEW_PWD_FAIL,
} from '../actions/findPwd';

export const findPwdReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_EMAIL:
			return {
				...state,
				sendNewPwdMail: {
					isLoading: true,
					done: false,
					error: false,
				},
			};
		case SEND_EMAIL_SUCCESS:
			return {
				...state,
				sendNewPwdMail: {
					isLoading: false,
					done: true,
					error: false,
				},
			};
		case SEND_EMAIL_FAIL:
			return {
				...state,
				sendNewPwdMail: {
					isLoading: false,
					done: false,
					error: true,
				},
			};
		case SET_NEW_PWD:
			return {
				...state,
				setNewPwd: {
					isLoading: true,
					done: false,
					error: false,
				}
			}
		case SET_NEW_PWD_SUCCESS:
			return {
				...state,
				setNewPwd: {
					isLoading: false,
					done: true,
					error: false,
				}
			}
		case SET_NEW_PWD_FAIL:
			return {
				...state,
				setNewPwd: {
					isLoading: false,
					done: false,
					error: true,
				}
			}
		default:
			return state;
	}
};
