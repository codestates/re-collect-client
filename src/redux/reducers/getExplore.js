import initialState from './initialState';
import {
	GET_INFO,
	GET_INFO_SUCCESS,
	GET_INFO_FAIL,
} from '../actions/getExplore';

export const getExploreReducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_INFO:
		return {
			...state,
			exploreUsers: { ...state.exploreUsers, isLoading: true },
		};
	case GET_INFO_SUCCESS:
		return {
			...state,
			exploreUsers: {
				...state.exploreUsers,
				data: action.payload,
			},
		};
	case GET_INFO_FAIL:
		return {
			...state,
			exploreUsers: {
				...state.exploreUsers,
				error: action.error,
			},
		};
	default:
		return state;
	}
};
