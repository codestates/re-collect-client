import axios from "axios";
import { getBookmark } from "../modules/bookmark";
import { getAccessToken } from "../modules/getAccessToken";

// actions
export const addVisitCount = (id) => async (dispatch) => {
  const accessToken = localStorage.getItem(`accessToken`);
  console.log(` bookmarkID : ${id}, add visitCount `);

  if (accessToken) {
    axios
      .patch(`https://api.recollect.today/bookmarks/:${id}`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then(() => dispatch(getBookmark()))
      .catch((err) => {
        if (err.status === 401) {
          dispatch(getAccessToken());
        } else {
          console.log(err);
        }
      });
  }
};
