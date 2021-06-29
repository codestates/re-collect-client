function CollectInputBox() {
  return (
    <div className="sidebar__collectInputBox">
      <input className="sidebar__input" type="text" />
      <input className="sidebar__input" type="text" placeholder="Text" />
      <input className="sidebar__input--url" type="url" placeholder="URL" />
      <div className="sidebar__customizingSection">
        <div className="sidebar__colorPick">
          <button className="sidebar__color-circle--blue"></button>
          <button className="sidebar__color-circle--green"></button>
          <button className="sidebar__color-circle--red"></button>
        </div>
        <div className="sidebar__importantPick">
          <input
            className="sidebar__important"
            type="checkbox"
            name="important"
          />
          <label for="important">중요</label>
        </div>
      </div>
      <div className="sidebar__btnSection">
        <button className="sidebar__btn left">추가</button>
        <button className="sidebar__btn right">삭제</button>
      </div>
    </div>
  );
}

export default CollectInputBox;
