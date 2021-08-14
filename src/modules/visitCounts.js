import axios from "axios";
import { getBookmark } from "../modules/bookmark";

// actions
export const addVisitCount = (id) => async (dispatch) => {
  const accessToken = localStorage.getItem(`accessToken`);

  if (accessToken) {
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
        dispatch(getBookmark());
      });
  }
};
