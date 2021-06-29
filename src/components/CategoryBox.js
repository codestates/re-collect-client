import Bookmark from './Bookmark';
export default function CategoryBox() {
  return (
    <div className="categorybox">
      <div className="categorybox__header">
        <button className="categorybox__header-editbtn">edit</button>
        <span>this is header</span>
      </div>
      <div className="categorybox__view">
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
      </div>
    </div>
  );
}
