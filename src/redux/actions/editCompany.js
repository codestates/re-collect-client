import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getProfile } from './getProfile';
import handleError from '../lib/errorHandling';

export const EDIT_COMPANY = 'EDIT_COMPANY';
export const EDIT_COMPANY_SUCCESS = 'EDIT_COMPANY_SUCCESS';
export const EDIT_COMPANY_FAIL = 'EDIT_COMPANY_FAIL';

export const editCompany = (company) => (dispatch) => {
  dispatch({ type: EDIT_COMPANY });
  _axios
    .patch('/profile/company', {
      company: company,
    })
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      dispatch({
        type: EDIT_COMPANY_SUCCESS,
      });
    })
    .then(() => {
      dispatch(getProfile());
      dispatch(notify('직장정보를 변경했습니다.'));
    })
    .catch((e) => {
      const errorMessage = handleError('직장정보 변경', e.response.status);
      dispatch({ type: EDIT_COMPANY_FAIL, error: errorMessage });
      dispatch(notify(errorMessage));
    });
};
