import { logoutThunk } from "../modules/login";

// action
export const getAcessToken = () => (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");

  axios
    .get(`https://api.recollect.today/auth/token`, {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res); // 응답확인
      const newAccessToken = res.data.accessToken;
      localStorage.setItem(`accessToken`, newAccessToken);
    })
    .catch(() => {
      dispatch(logoutThunk);
    });
};
