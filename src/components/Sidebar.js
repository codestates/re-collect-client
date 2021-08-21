import CollectInputBox from './CollectInputBox';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editEnd } from '../actions/editBookmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
	const isEdit = useSelector(
		(state) => state.bookmarkReducer.tempBookmark.isEdit
	);
	const dispatch = useDispatch();

	const [xposition, setXposition] = useState(-300);
	const [width, setWidth] = useState(300);

	useEffect(() => {
		setXposition(0);
	}, []);

	useEffect(() => {
		if (isEdit) {
			setWidth(300);
			setXposition(0);
		}
	}, [isEdit]);

	const sidebarToggleHandler = () => {
		if (xposition < 0) {
			setXposition(0);
			setWidth(300);
		} else {
			setXposition(-300);
			setWidth(0);
			dispatch(editEnd());
		}
	};

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
						transform: 'translatex(300px)',
					}}
				>
					{width === 300 ? (
						<FontAwesomeIcon icon={faCaretLeft} />
					) : (
						<FontAwesomeIcon icon={faCaretRight} />
					)}
				</button>
				<CollectInputBox className="sidebar" />
			</div>
		</>
	);
}
