import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

export default function CollectBookmark(props) {
  return (
    <article
      className={props.className}
      draggable={props.draggable}
      onDragStart={props.handleDragStart}
      onDragEnter={props.handleDragEnter}
      style={{
        border: `1px solid ${props.color}`,
        background: `${props.importance === 1 ? props.color : 'white'}`,
        color: `${props.importance === 1 ? 'white' : 'black'}`,
      }}
    >
      <div className="categorybox__bookmark-textcontainer">
        <a href={props.url} className="categorybox__bookmark-text">
          {props.children}
        </a>
      </div>
      <div className="categorybox__bookmark-ellipsis">
        <FontAwesomeIcon className="ellipsis" icon={faEllipsisH} />
      </div>
      <button className="categorybox__bookmark-editbtn">edit</button>
      <div
        className="categorybox__bookmark-triangle"
        style={{
          borderRightColor: `${props.importance === 1 ? 'white' : props.color}`,
        }}
      ></div>
    </article>
  );
}
