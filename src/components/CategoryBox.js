import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { categoryEditStart } from '../modules/category';

export default function CategoryBox(props) {
  const dispatch = useDispatch();

  return (
    <div className="categorybox">
      <div className="categorybox__header">
        <button
          className="categorybox__header-editbtn"
          onClick={() => {
            dispatch(categoryEditStart(props.categoryId, props.title));
          }}
        >
          edit
        </button>
        <span className="categorybox__header-text">{props.title}</span>
        <div
          className="categorybox__header-pencil"
          onClick={() => {
            dispatch(categoryEditStart(props.categoryId, props.title));
          }}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </div>
      </div>
      <div className="categorybox__view" onDragEnter={props.dragEnterHandler}>
        {props.children}
      </div>
      <div className="categorybox__footer"></div>
    </div>
  );
}
