import axios from 'axios';
import { notify } from './notify';
import { getProfile } from './getProfile';
//import { getAccessToken } from "../modules/getAccessToken";

//const EDIT_COMPANY = 'EDIT_COMPANY';
export const EDIT_COMPANY_SUCCESS = 'EDIT_COMPANY_SUCCESS';
export const EDIT_COMPANY_FAIL = 'EDIT_COMPANY_FAIL';

export const editCompany = (company) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  axios
    .patch(
      'https://api.recollect.today/profile/company',
      {
        company: company,
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      dispatch({
        type: EDIT_COMPANY_SUCCESS,
      });
    })
    .then(() => {
      dispatch(getProfile());
      dispatch(notify('직장정보를 변경했습니다.'));
    })
    .catch((err) => {
      dispatch({ type: EDIT_COMPANY_FAIL, error: err.message });
      dispatch(notify('직장정보 변경 실패'));
    });
};
