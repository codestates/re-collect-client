import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCategory, categoryEditEnd } from '../../redux/actions/editCategory';
import { notify } from '../../redux/actions/notify';

import CategoryReallyDeleteModal from './CategoryReallyDeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function CategoryEditModal() {
	// eslint-disable-next-line no-unused-vars
	const { isCategoryEdit, id, title } = useSelector(
		(state) => state.categoryReducer
	);
	const dispatch = useDispatch();

	const [reallyDelete, setreallyDelete] = useState(false);
	const [data, setData] = useState({
		id: '',
		title: '',
	});

	useEffect(() => {
		if (id && title) {
			setData({
				...data,
				id: id,
				title: title,
			});
		}
	}, [id, title]);

	const handleOpenReallyModal = () => {
		setreallyDelete(!reallyDelete);
	};

	const handleTitleInputChange = (e) => {
		const { value } = e.target;
		setData({
			...data,
			title: value,
		});
	};

	const handleEditCategory = () => {
		if (data.title.length === 0) {
			dispatch(notify('제목을 꼭 입력해주세요!'));
			return;
		}
		dispatch(editCategory(data));
	};

	return (
		<div className="categoryEditModal__background">
			{reallyDelete ? (
				<CategoryReallyDeleteModal
					data={data.id}
					className="categoryReally"
					handleClose={handleOpenReallyModal}
				/>
			) : (
				<div className="categoryEditModal__container">
					<div
						className="categoryEditModal__closeBtn"
						onClick={() => {
							dispatch(categoryEditEnd());
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>
					<div className="categoryEditModal__text">
            카테고리 제목 수정 및 <br />
            카테고리 삭제
					</div>
					<input
						className="categoryEditModal__titleInput"
						type="text"
						placeholder="카테고리 제목 입력"
						value={data.title}
						onChange={(e) => {
							handleTitleInputChange(e);
						}}
					></input>
					<button
						className="categoryEditModal__editBtn"
						onClick={handleEditCategory}
					>
            카테고리 제목 수정
					</button>
					<button
						className="categoryEditModal__deleteBtn"
						onClick={handleOpenReallyModal}
					>
            카테고리 삭제
					</button>
				</div>
			)}
		</div>
	);
}

export default CategoryEditModal;
