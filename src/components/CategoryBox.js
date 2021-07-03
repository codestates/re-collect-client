import CollectBookmark from './CollectBookmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export default function CategoryBox() {
  return (
    <div className="categorybox">
      <div className="categorybox__header">
        <button className="categorybox__header-editbtn">edit</button>
        <span className="categorybox__header-text">this is header</span>
        <div className="categorybox__header-pencil">
          <FontAwesomeIcon icon={faPencilAlt} />
        </div>
      </div>
      <div className="categorybox__view">
        <CollectBookmark />
        <CollectBookmark />
        <CollectBookmark />
        <CollectBookmark />
        <CollectBookmark />
        <CollectBookmark />
        <CollectBookmark />
        <CollectBookmark />
        <CollectBookmark />
        <CollectBookmark />
      </div>
      <div className="categorybox__footer"></div>
    </div>
  );
}
