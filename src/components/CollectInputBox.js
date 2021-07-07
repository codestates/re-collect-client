import React, { useState, useEffect } from 'react';
import Creatable, { makeCreatableSelect } from 'react-select/creatable';
import { addBookmark, bookmarkReducerX } from '../modules/addBookmark';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '80%',
    height: 36,
    border: '1px rgba(0, 0, 0, 0.5) solid',
    fontSize: 16,
    marginBottom: 15,
    display: 'flex',
    background: 'white',
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

function CollectInputBox(props) {
  const state = useSelector((state) => state.bookmarkReducerX);
  const { tempBookmark, user } = state;
  const dispatch = useDispatch();

  const handleColorPick = (e) => {
    setbookmarkInput({ ...bookmarkInput, color: e.target.id });
  };

  const [bookmarkInput, setbookmarkInput] = useState({
    color: null,
    category: null,
    text: null,
    url: null,
    importance: false,
  });

  const handleCategoryChange = (newValue, actionMeta) => {
    setbookmarkInput({ ...bookmarkInput, category: newValue });
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (name === 'importance') {
      setbookmarkInput((oldValue) => {
        const newImportance = !oldValue.importance;
        return {
          ...bookmarkInput,
          importance: newImportance,
        };
      });
    } else {
      setbookmarkInput({
        ...bookmarkInput,
        [name]: value,
      });
    }
  };

  const handleAddBookmark = () => {
    if (user !== '') {
      dispatch(addBookmark(bookmarkInput));
      if (tempBookmark.error) {
        alert(tempBookmark.error);
        console.error(tempBookmark.error);
        return;
      }

      setbookmarkInput({
        color: null,
        category: null,
        text: null,
        url: null,
        importance: false,
      });
    }
  };

  return (
    <div className={`${props.className}__collectInputBox`}>
      <Creatable
        className={`${props.className}__select`}
        isClearable
        styles={customStyles}
        placeholder="Category"
        options={options}
        onChange={handleCategoryChange}
        value={bookmarkInput.category}
      />
      <input
        className={`${props.className}__input`}
        name="text"
        type="text"
        value={bookmarkInput.text}
        onChange={handleInputChange}
        placeholder="Text"
      />
      <input
        className={`${props.className}__input--url`}
        name="url"
        type="url"
        value={bookmarkInput.url}
        onChange={handleInputChange}
        placeholder="Url"
      />
      <div className={`${props.className}__customizingSection`}>
        <div className={`${props.className}__colorPick`}>
          <button
            id="blue"
            className={`${props.className}__color-circle--blue${
              bookmarkInput.color === 'blue' ? ' active' : ''
            }`}
            onClick={(e) => {
              handleColorPick(e);
            }}
          >
            {bookmarkInput.color === 'blue' ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              ''
            )}
          </button>
          <button
            id="green"
            className={`${props.className}__color-circle--green${
              bookmarkInput.color === 'green' ? ' active' : ''
            }`}
            onClick={(e) => {
              handleColorPick(e);
            }}
          >
            {bookmarkInput.color === 'green' ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              ''
            )}
          </button>
          <button
            id="red"
            className={`${props.className}__color-circle--red${
              bookmarkInput.color === 'red' ? ' active' : ''
            }`}
            onClick={(e) => {
              handleColorPick(e);
            }}
          >
            {bookmarkInput.color === 'red' ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              ''
            )}
          </button>
        </div>
        <div className={`${props.className}__importantPick`}>
          <input
            className={`${props.className}__important`}
            type="checkbox"
            name="importance"
            onClick={handleInputChange}
            checked={bookmarkInput.importance}
          />
          <label htmlFor="importance">중요</label>
        </div>
      </div>
      <div className={`${props.className}__btnSection`}>
        <button
          className={`${props.className}__btn left`}
          onClick={handleAddBookmark}
        >
          지우기
        </button>
        <button className={`${props.className}__btn right`}>삭제</button>
      </div>
    </div>
  );
}

export default CollectInputBox;
