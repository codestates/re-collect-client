import axios from "axios";
import { getBookmark } from "../modules/bookmark";
import { getAccessToken } from "../modules/getAccessToken";
import { recollect } from "../modules/getRecollect";

// actions
export const addVisitCount = (id) => async (dispatch) => {
  const accessToken = localStorage.getItem(`accessToken`);

  if (accessToken) {
    console.log(accessToken);
    axios
      .patch(
        `https://api.recollect.today/bookmarks/${id}`,
        {},
        {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        console.log("여기맞아?");
        dispatch(getBookmark());
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(getAccessToken());
          return;
        } else {
          console.log("err");
        }
      });
  }
};
