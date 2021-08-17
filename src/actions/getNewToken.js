import { logoutThunk } from "../modules/sign";
import axios from "axios";

export const GET_NEW_TOKEN = "GET_NEW_TOKEN";

export const getNewToken = () => (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");
  axios
    .get(`https://api.recollect.today/auth/token`, {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      dispatch({ type: GET_NEW_TOKEN, payload: res.data.accessToken });
    })
    .catch(() => {
      dispatch(logoutThunk());
    });
};
