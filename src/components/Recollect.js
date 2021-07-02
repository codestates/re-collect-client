import BigBookmark from './BigBookmark';

function Recollect() {
  return (
    <div className="recollect">
      <div className="recollect__title">Recollect</div>
      <div className="recollect__bookmarks">
        <BigBookmark />
        <BigBookmark />
        <BigBookmark />
        <BigBookmark />
        <BigBookmark />
      </div>
    </div>
  );
}

export default Recollect;
