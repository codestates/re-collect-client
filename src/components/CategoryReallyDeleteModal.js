import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../modules/category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function CategoryReallyDeleteModal(props) {
  const dispatch = useDispatch();

  const handleYesBtn = () => {
    dispatch(deleteCategory(props.data));
  };

  return (
    <div className={`${props.className}__container`}>
      <div
        className={`${props.className}__closeBtn`}
        onClick={() => {
          props.handleClose();
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className={`${props.className}__text`}>
        카테고리에 포함된
        <br />
        모든 북마크들이 사라집니다
        <br />
        정말 삭제하시겠습니까?
      </div>
      <div className={`${props.className}__Btns`}>
        <button
          className={`${props.className}__noBtns`}
          onClick={() => {
            props.handleClose();
          }}
        >
          아니오
        </button>
        <button
          className={`${props.className}__yesBtns`}
          onClick={handleYesBtn}
        >
          예
        </button>
      </div>
    </div>
  );
}

export default CategoryReallyDeleteModal;
