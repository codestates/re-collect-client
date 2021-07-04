import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

export default function CollectBookmark() {
  return (
    <article className="categorybox__bookmark">
      <span className="categorybox__bookmark-text">이것은 북마크 입니다</span>
      <div className="categorybox__bookmark-ellipsis">
        <FontAwesomeIcon className="ellipsis" icon={faEllipsisH} />
      </div>
      <button className="categorybox__bookmark-editbtn">edit</button>
      <div className="categorybox__bookmark-triangle"></div>
    </article>
  );
}
