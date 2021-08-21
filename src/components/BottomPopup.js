import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editEnd } from '../actions/editBookmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CollectInputBox from './CollectInputBox';

function BottomPopup() {
	const isEdit = useSelector(
		(state) => state.bookmarkReducer.tempBookmark.isEdit
	);
	const dispatch = useDispatch();

	const [yposition, setYposition] = useState(-120);

	useEffect(() => {
		setYposition(0);
	}, []);

	useEffect(() => {
		if (isEdit) {
			setYposition(-120);
		} else {
			setYposition(0);
		}
	}, [isEdit]);

	const bottomPopupToggleHandler = () => {
		if (yposition === 0) {
			setYposition(-120);
		} else {
			setYposition(0);
			dispatch(editEnd());
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
							<CollectInputBox className="bottomPopup" />
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default BottomPopup;
