import initialState from './initialState'

import {GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL} from '../actions/getProfile'
import {EDIT_USERNAME, EDIT_USERNAME_SUCCESS, EDIT_USERNAME_FAIL} from '../actions/editUsername'
import {EDIT_COMPANY, EDIT_COMPANY_SUCCESS, EDIT_COMPANY_FAIL} from '../actions/editCompany'
import {EDIT_GITREPO, EDIT_GITREPO_SUCCESS, EDIT_GITREPO_FAIL} from '../actions/editGitRepo'
import {EDIT_PWD_INITIALIZE, EDIT_PWD_SUCCESS, EDIT_PWD_FAIL} from '../actions/editPwd'
import {DEL_ACCOUNT, DEL_ACCOUNT_SUCCESS, DEL_ACCOUNT_FAIL} from '../actions/delAccount'


export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				profile: { ...state.profile },
			};
		case GET_PROFILE_SUCCESS:
			return {
				...state,
				profile: { ...state.profile, ...action.profile },
			};
		case GET_PROFILE_FAIL:
			return {
				...state,
				profile: { ...state.profile, ...action.profile, error: action.error },
			};
		case EDIT_USERNAME:
			return {
				...state,
				profile: { ...state.profile },
			};
		case EDIT_USERNAME_SUCCESS:
			return {
				...state,
				profile: { ...state.profile },
			};
		case EDIT_USERNAME_FAIL:
			return {
				...state,
				profile: { ...state.profile, error: action.error },
			};
		case EDIT_COMPANY:
			return {
				...state,
				profile: { ...state.profile },
			};
		case EDIT_COMPANY_SUCCESS:
			return {
				...state,
				profile: { ...state.profile },
			};
		case EDIT_COMPANY_FAIL:
			return {
				...state,
				profile: { ...state.profile, error: action.error },
			};
		case EDIT_GITREPO:
			return {
				...state,
				profile: { ...state.profile },
			};
		case EDIT_GITREPO_SUCCESS:
			return {
				...state,
				profile: { ...state.profile },
			};
		case EDIT_GITREPO_FAIL:
			return {
				...state,
				profile: { ...state.profile, error: action.error },
			};
		case EDIT_PWD_INITIALIZE:
			return {
				...state,
				profile: { 
					...state.profile,
					isEditPwdSuccess: false, 
					error: null },
			};
		case EDIT_PWD_SUCCESS:
			return {
				...state,
				profile: { 
					...state.profile, 
					isEditPwdSuccess : true,
				},
			};
		case EDIT_PWD_FAIL:
			return {
				...state,
				profile: { ...state.profile, error: action.error },
			};
		case DEL_ACCOUNT:
			return {
				...state,
				profile: { ...state.profile, error: null},
			};
		case DEL_ACCOUNT_SUCCESS:
			return {
				...state,
				profile: { ...state.profile },
			};
		case DEL_ACCOUNT_FAIL:
			return {
				...state,
				profile: { ...state.profile, error: action.error },
			};
		default:
			return state;
	}
};