export const SET_MODAL_MODE = 'SET_MODAL_MODE';

export const setModalMode = (mode) => (dispatch) => {
	dispatch({ type : SET_MODAL_MODE, mode });
};
