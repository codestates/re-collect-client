/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { categoryEditStart } from '../redux/actions/editCategory';
import { notify } from '../redux/actions/notify';

export default function CategoryBox(props) {
	const accessToken = localStorage.getItem('accessToken');
	const dispatch = useDispatch();

	const handleEditBtn = () => {
		if (accessToken) {
			dispatch(categoryEditStart(props.categoryId, props.title));
		} else {
			dispatch(notify('로그인하지 않으면 사용할 수 없습니다.'));
		}
	};

	return (
		<div className="categorybox">
			<div className="categorybox__header">
				<button className="categorybox__header-editbtn" onClick={handleEditBtn}>
          edit
				</button>
				<span className="categorybox__header-text">{props.title}</span>
				<div className="categorybox__header-pencil" onClick={handleEditBtn}>
					<FontAwesomeIcon icon={faPencilAlt} />
				</div>
			</div>
			<div className="categorybox__view" onDragEnter={props.dragEnterHandler}>
				{props.children}
			</div>
			<div className="categorybox__footer"></div>
		</div>
	);
}
