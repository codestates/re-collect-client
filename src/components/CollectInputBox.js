import React, { useState, useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '80%',
    height: 36,
    border: '1px rgba(0, 0, 0, 0.5) solid',
    fontSize: 16,
    marginBottom: 15,
    display: 'flex',
  }),

  control: () => ({
    display: 'flex',
    flex: 1,
    width: 40,
  }),

  placeholder: (provided) => ({
    color: 'rgba(0, 0, 0, 0.5)',
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

function CollectInputBox({ place }) {
  const [colorPick, setColorPick] = useState([false, false, false]);

  useEffect(() => {
    setColorPick([false, false, false]);
  }, []);

  const colorPickHandler = (e) => {
    const idx = Number(e.target.id);
    if (colorPick[idx]) {
      setColorPick([false, false, false]);
      return;
    }
    const newColorPick = [false, false, false];
    newColorPick[idx] = true;
    setColorPick(newColorPick);
  };

  return (
    <div className={`${place}__collectInputBox`}>
      <AsyncCreatableSelect
        className={`${place}__select`}
        isClearable
        styles={customStyles}
        placeholder="Category"
      />
      <input className={`${place}__input`} type="text" placeholder="Text" />
      <input className={`${place}__input--url`} type="url" placeholder="Url" />
      <div className={`${place}__customizingSection`}>
        <div className={`${place}__colorPick`}>
          <button
            id="0"
            className={`${place}__color-circle--blue${
              colorPick[0] ? ' active' : ''
            }`}
            onClick={(e) => {
              colorPickHandler(e);
            }}
          >
            {colorPick[0] ? <FontAwesomeIcon icon={faCheck} /> : ''}
          </button>
          <button
            id="1"
            className={`${place}__color-circle--green${
              colorPick[1] ? ' active' : ''
            }`}
            onClick={(e) => {
              colorPickHandler(e);
            }}
          >
            {colorPick[1] ? <FontAwesomeIcon icon={faCheck} /> : ''}
          </button>
          <button
            id="2"
            className={`${place}__color-circle--red${
              colorPick[2] ? ' active' : ''
            }`}
            onClick={(e) => {
              colorPickHandler(e);
            }}
          >
            {colorPick[2] ? <FontAwesomeIcon icon={faCheck} /> : ''}
          </button>
        </div>
        <div className={`${place}__importantPick`}>
          <input
            className={`${place}__important`}
            type="checkbox"
            name="important"
          />
          <label for="important">중요</label>
        </div>
      </div>
      <div className={`${place}__btnSection`}>
        <button className={`${place}__btn left`}>추가</button>
        <button className={`${place}__btn right`}>삭제</button>
      </div>
    </div>
  );
}

export default CollectInputBox;
