import CollectBookmark from './CollectBookmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export default function CategoryBox(props) {
  const dropHandler = (e) => {
    const bookmark_id = e.dataTransfer.getData('bookmark_id');

    const bookmark = document.getElementById(bookmark_id);

    e.target.appendChild(bookmark);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="categorybox">
      <div className="categorybox__header">
        <button className="categorybox__header-editbtn">edit</button>
        <span className="categorybox__header-text">this is header</span>
        <div className="categorybox__header-pencil">
          <FontAwesomeIcon icon={faPencilAlt} />
        </div>
      </div>
      <div
        id={props.id}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        className="categorybox__view"
      >
        {props.children}
      </div>
      <div className="categorybox__footer"></div>
    </div>
  );
}
