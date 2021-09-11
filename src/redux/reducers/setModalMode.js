import initialState from './initialState'
import { SET_MODAL_MODE } from '../actions/setModalMode';

export const setModalModeReducer = (state = initialState, action)=>{
	switch(action.type){
		case SET_MODAL_MODE : {
			return{
				...state,
				modalMode : action.mode,
			}
		}
		default:
			return state;
	}
}