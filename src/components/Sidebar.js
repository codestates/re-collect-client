import CollectInputBox from './CollectInputBox';
import React, { useState, useEffect } from 'react';

export default function Sidebar() {
  const [xposition, setXposition] = useState(-250);
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
          transform: `translate(300px)`,
        }}
      ></button>
      <CollectInputBox />
    </div>
  );
}
