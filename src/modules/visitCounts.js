// api 문서 작성하기

import axios from "axios";

// /bookmarks/visitCount/:id
// headers : authorization
// 200, 401, 500

// actions
export const visitBookmark = (id) => {
  const accessToken = localStorage.getItem(`accessToken`);

  axios
    .get(`https://api.recollect.today/bookmarks/:${id}/visitCount`)
    .then()
    .catch();
};
