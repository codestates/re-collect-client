import { addVisitCount } from "../actions/addVisitCount";
import { useDispatch } from "react-redux";

export default function BigBookmark({ id, text, color, importance, url }) {
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
        dispatch(addVisitCount(id));
        window.open(url);
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
