import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { editStart } from "../modules/bookmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { addVisitCount } from "../modules/visitCounts";

export default function CollectBookmark(props) {
  const { data } = props;

  const dispatch = useDispatch();

  const handleEditBtn = () => {
    dispatch(editStart(data));
  };

  return (
    <article
      className={props.className}
      draggable={props.draggable}
      onDragStart={props.handleDragStart}
      onDragEnter={props.handleDragEnter}
      style={{
        border: `1px solid ${data.item.color}`,
        background: `${data.item.importance === 1 ? data.item.color : "white"}`,
        color: `${data.item.importance === 1 ? "white" : "black"}`,
      }}
    >
      <div
        onClick={() => {
          dispatch(addVisitCount(props.data.item.id));
        }}
        className="categorybox__bookmark-textcontainer"
      >
        <a
          href={data.item.url}
          target="_blank"
          className="categorybox__bookmark-text"
          title="해당 북마크 링크로 이동하기"
        >
          {data.item.text}
        </a>
      </div>
      <div className="categorybox__bookmark-ellipsis">
        <FontAwesomeIcon
          onClick={handleEditBtn}
          className="ellipsis"
          icon={faEllipsisH}
        />
      </div>
      <button className="categorybox__bookmark-editbtn" onClick={handleEditBtn}>
        edit
      </button>
      <div
        className="categorybox__bookmark-triangle"
        style={{
          borderRightColor: `${
            data.item.importance === 1 ? "white" : data.item.color
          }`,
        }}
      ></div>
    </article>
  );
}
