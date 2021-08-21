import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getProfile } from './getProfile';
//import { getAccessToken } from "../modules/getAccessToken";

//const EDIT_GITREPO = 'EDIT_GITREPO';
export const EDIT_GITREPO_SUCCESS = 'EDIT_GITREPO_SUCCESS';
export const EDIT_GITREPO_FAIL = 'EDIT_GITREPO_FAIL';

export const editGitRepo = (gitrepo) => (dispatch) => {
	_axios
		.patch('/profile/gitrepo', {
			gitrepo: gitrepo, //input.value
		})
		.then((res) => {
			dispatch({
				type: EDIT_GITREPO_SUCCESS,
			});
		})
		.then(() => {
			dispatch(getProfile());
			dispatch(notify('깃허브 주소를 변경했습니다.'));
		})
		.catch((err) => {
			dispatch({ type: EDIT_GITREPO_FAIL, error: err.message });
			dispatch(notify('깃허브 주소 변경 실패'));
		});
};
