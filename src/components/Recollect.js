import React, { useState, useEffect } from "react";
import BigBookmark from "./BigBookmark";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

function Recollect() {
  const unreadBookmarks = useSelector((state) => state.recollectReducer);

  return (
    <div className="recollect">
      {/* {console.log("unreadbookmarks 여기있네 : ", unreadBookmarks)} */}
      <div className="recollect__title">Recollect</div>
      <div className="recollect__bookmarks">
        <BigBookmark />
        <BigBookmark />
        <BigBookmark />
        <BigBookmark />
        <BigBookmark />
      </div>
    </div>
  );
}

export default Recollect;
