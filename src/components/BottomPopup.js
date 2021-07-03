import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CollectInputBox from './CollectInputBox';

function BottomPopup() {
  const [yposition, setYposition] = useState(-120);

  useEffect(() => {
    setYposition(0);
  }, []);

  const bottomPopupToggleHandler = () => {
    if (yposition === 0) {
      setYposition(-120);
    } else {
      setYposition(0);
    }
  };

  return (
    <>
      {yposition === 0 ? (
        <button
          className="bottomPopup__plusBtn"
          onClick={bottomPopupToggleHandler}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      ) : (
        ''
      )}
      <div
        className="bottomPopup__wrapper"
        style={{
          transform: `translatey(${yposition}vh)`,
        }}
      >
        {yposition === 0 ? (
          ''
        ) : (
          <>
            <div
              className="bottomPopup__background"
              onClick={bottomPopupToggleHandler}
            ></div>
            <div className="bottomPopup__contentsBackground">
              <div className="bottomPopup__text">북마크 추가하기</div>
              <CollectInputBox place="bottomPopup" />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default BottomPopup;
