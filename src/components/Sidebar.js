import CollectInputBox from './CollectInputBox';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const [xposition, setXposition] = useState(-300);
  const [width, setWidth] = useState(300);

  const sidebarToggleHandler = () => {
    if (xposition < 0) {
      setXposition(0);
      setWidth(300);
    } else {
      setXposition(-300);
      setWidth(0);
    }
  };

  useEffect(() => {
    setXposition(0);
  }, []);

  return (
    <>
      <div
        className="sidebar"
        style={{
          width: width,
          transform: `translatex(${xposition}px)`,
        }}
      >
        <button
          onClick={() => {
            sidebarToggleHandler();
          }}
          className="sidebar__toggleButton"
          style={{
            transform: `translatex(300px)`,
          }}
        >
          {width === 300 ? (
            <FontAwesomeIcon icon={faCaretLeft} />
          ) : (
            <FontAwesomeIcon icon={faCaretRight} />
          )}
        </button>
        <CollectInputBox place="sidebar" />
      </div>
    </>
  );
}
