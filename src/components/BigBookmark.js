import { addVisitCount } from "../modules/visitCounts";
import { useDispatch } from "react-redux";

export default function BigBookmark({ key, text, color, importance }) {
  const dispatch = useDispatch();
  return (
    <article
      className="bigBookmark"
      style={{
        border: `1px solid ${color}`,
        background: `${importance === 1 ? color : `white`}`,
        color: `${importance === 1 ? `white` : `black`}`,
      }}
      onClick={() => {
        // 확인필요! //
        console.log("Bookmark ID : ", key);
        dispatch(addVisitCount(key));
      }}
    >
      {text ? text : `이것은 북마크 입니다.`}

      <div
        className="bigBookmark__triangle"
        style={{
          borderRightColor: `${importance === 1 ? `white` : color}`,
        }}
      ></div>
    </article>
  );
}
