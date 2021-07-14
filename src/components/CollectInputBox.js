import React, { useState, useEffect } from 'react';
import Creatable from 'react-select/creatable';
import {
  addBookmark,
  addGuestBookmark,
  editBookmark,
  editGuestBookmark,
  editEnd,
  deleteBookmark,
  deleteGuestBookmark,
} from '../modules/bookmark';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { notify } from '../modules/notification';

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
    ...provided,
    color: 'rgba(0, 0, 0, 0.5)',
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

function CollectInputBox(props) {
  const accessToken = localStorage.getItem('accessToken');

  const { reducedbookmarks, category } = useSelector(
    (state) => state.bookmarkReducer.userBookmarks
  );

  const guestCategory = useSelector(
    (state) => state.bookmarkReducer.guestBookmarks.category
  );
  const { isEdit, data } = useSelector(
    (state) => state.bookmarkReducer.tempBookmark
  );

  const dispatch = useDispatch();

  const [categoryArr, setCategoryArr] = useState(
    category.map((el) => ({ value: el, label: el }))
  );

  const [bookmarkInput, setbookmarkInput] = useState({
    category: '',
    categoryId: null,
    bookmarkId: null,
    text: '',
    url: '',
    importance: false,
    color: '',
  });

  useEffect(() => {
    if (data) {
      setbookmarkInput({
        category: data.category,
        categoryId: data.categoryId,
        bookmarkId: data.bookmarkId,
        text: data.text,
        url: data.url,
        importance: data.importance,
        color: data.color,
      });
    } else {
      handleInitialize();
    }
  }, [data]);

  useEffect(() => {
    if (accessToken) {
      setCategoryArr(category.map((el) => ({ value: el, label: el })));
    } else {
      setCategoryArr(
        Object.values(guestCategory).map((el) => ({ value: el, label: el }))
      );
    }
  }, [category, guestCategory]);

  const handleCategoryChange = (newValue, actionMeta) => {
    console.log(newValue);
    setbookmarkInput({ ...bookmarkInput, category: newValue });
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (name === 'importance') {
      setbookmarkInput((oldValue) => {
        return {
          ...bookmarkInput,
          importance: !oldValue.importance,
        };
      });
    } else {
      setbookmarkInput({
        ...bookmarkInput,
        [name]: value,
      });
    }
  };

  const handleInitialize = () => {
    setbookmarkInput({
      category: '',
      categoryId: null,
      bookmarkId: null,
      text: '',
      url: '',
      importance: false,
      color: '',
    });
  };

  const handleColorPick = (e) => {
    setbookmarkInput({ ...bookmarkInput, color: e.target.id });
  };

  const handleCheckBefore = (mode) => {
    const { text, url, category } = bookmarkInput;

    if (!text || !url || !category) {
      if (!category) dispatch(notify('카테고리를 지정해주세요!'));
      if (!text) dispatch(notify('텍스트를 입력해주세요!'));
      if (!url) dispatch(notify('url을 입력해주세요!'));
      return;
    }

    switch (mode) {
      case 'edit':
        handleEditBookmark();
        break;
      case 'add':
        handleAddBookmark();
        break;
      default:
        return;
    }
  };

  const handleAddBookmark = () => {
    console.log('진입여부');
    if (accessToken) {
      dispatch(addBookmark(bookmarkInput));
    } else {
      dispatch(addGuestBookmark(bookmarkInput));
    }
    handleInitialize();
  };

  const handleEditBookmark = () => {
    if (accessToken) {
      dispatch(editBookmark(bookmarkInput));
      return;
    }
    dispatch(editGuestBookmark(bookmarkInput));
  };

  const handleEditEnd = () => {
    dispatch(editEnd());
    handleInitialize();
  };

  const handleDeleteBookmark = () => {
    if (accessToken) {
      dispatch(deleteBookmark(bookmarkInput));
      return;
    }
    dispatch(deleteGuestBookmark(bookmarkInput));
  };

  return (
    <div className={`${props.className}__collectInputBox`}>
      <div className={`${props.className}__text`}>
        {isEdit ? '북마크 수정/삭제하기' : '북마크 추가하기'}
      </div>
      <Creatable
        className={`${props.className}__select`}
        isClearable
        styles={customStyles}
        placeholder="Category"
        options={categoryArr}
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
        pattern="https://"
      />
      <div className={`${props.className}__customizingSection`}>
        <div className={`${props.className}__colorPick`}>
          <button
            id="#214bc8"
            className={`${props.className}__color-circle--blue${
              bookmarkInput.color === '#214bc8' ? ' active' : ''
            }`}
            onClick={(e) => {
              handleColorPick(e);
            }}
          >
            {bookmarkInput.color === '#214bc8' ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              ''
            )}
          </button>
          <button
            id="#0eae61"
            className={`${props.className}__color-circle--green${
              bookmarkInput.color === '#0eae61' ? ' active' : ''
            }`}
            onClick={(e) => {
              handleColorPick(e);
            }}
          >
            {bookmarkInput.color === '#0eae61' ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              ''
            )}
          </button>
          <button
            id="#f24626"
            className={`${props.className}__color-circle--red${
              bookmarkInput.color === '#f24626' ? ' active' : ''
            }`}
            onClick={(e) => {
              handleColorPick(e);
            }}
          >
            {bookmarkInput.color === '#f24626' ? (
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
            onChange={handleInputChange}
            checked={bookmarkInput.importance}
          />
          <label htmlFor="importance">중요</label>
        </div>
      </div>
      <div className={`${props.className}__btnSection`}>
        <button
          className={`${props.className}__btn left`}
          onClick={
            isEdit
              ? () => {
                  handleEditEnd();
                }
              : () => {
                  handleInitialize();
                }
          }
          disabled={
            bookmarkInput.text === '' && bookmarkInput.url === '' ? true : false
          }
        >
          {isEdit ? '취소' : '지우기'}
        </button>
        <button
          className={`${props.className}__btn right`}
          onClick={
            isEdit
              ? () => {
                  handleCheckBefore('edit');
                }
              : () => {
                  handleCheckBefore('add');
                }
          }
        >
          {isEdit ? '수정' : '추가'}
        </button>
      </div>
      {isEdit ? (
        <div className={`${props.className}__deleteBtnSection`}>
          <button
            className={`${props.className}__deleteBtn`}
            onClick={handleDeleteBookmark}
          >
            삭제
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default CollectInputBox;
