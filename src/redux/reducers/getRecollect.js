import initialState from './initialState';
import { RECOLLECT } from '../actions/getRecollect';

export const recollectReducer = (state = initialState, action) => {
	switch (action.type) {
		case RECOLLECT:
			return {
				...state,
				unreadBookmarks: {
					data: action.unreadBookmarks,
					isLoading: false,
					error: null,
				},
			};
		default:
			return state;
	}
};
