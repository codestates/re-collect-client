import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

export default function CollectBookmark(props) {
  const dragStartHandler = (e) => {
    console.log('드래그 잡힌 북마크', e.target);
    const target = e.target;

    e.dataTransfer.setData('bookmark_id', target.id);
  };

  const dragOverHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <article
      id={props.id}
      draggable="true"
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      className="categorybox__bookmark"
    >
      <span className="categorybox__bookmark-text">{props.children}</span>
      <div className="categorybox__bookmark-ellipsis">
        <FontAwesomeIcon className="ellipsis" icon={faEllipsisH} />
      </div>
      <button className="categorybox__bookmark-editbtn">edit</button>
      <div className="categorybox__bookmark-triangle"></div>
    </article>
  );
}
