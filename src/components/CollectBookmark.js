import React from 'react';
import { useDispatch } from 'react-redux';
import { editStart } from '../redux/actions/editBookmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { addVisitCount } from '../redux/actions/addVisitCount';

export default function CollectBookmark(props) {
	const { data } = props;

	const dispatch = useDispatch();

	const handleEditBtn = () => { 
		dispatch(editStart(data));
	};

	const handleElipsisHoverColor = (color) => {
		switch (color) {
		case '#214bc8':
			return 'blue';
		case '#f24626':
			return 'red';
		case '#0eae61':
			return 'green';
		default:
			return 'blue';
		}
	};

	return (
		<article
			className={props.className}
			draggable={props.draggable}
			onDragStart={props.handleDragStart}
			onDragEnter={props.handleDragEnter}
			style={{
				border: `1px solid ${data.item.color}`,
				background: `${data.item.importance === 1 ? data.item.color : 'white'}`,
				color: `${data.item.importance === 1 ? 'white' : 'black'}`,
			}}
		>
			<div
				onClick={() => {
					dispatch(addVisitCount(props.data.item.id));
				}}
				className="categorybox__bookmark-textcontainer"
			>
				<a
					href={data.item.url}
					target="_blank"
					rel="noopener noreferrer" //추가
					className="categorybox__bookmark-text"
					title="해당 북마크 링크로 이동하기"
				>
					{data.item.text}
				</a>
			</div>
			<div
				className={`categorybox__bookmark-ellipsis ${
					data.item.importance === 1 && 'important'
				}
        ${handleElipsisHoverColor(data.item.color)}
        `}
			>
				<div onClick={handleEditBtn}>
					<FontAwesomeIcon className="ellipsis" icon={faEllipsisH} />
				</div>
			</div>
			<div
				className="categorybox__bookmark-triangle"
				style={{
					borderRightColor: `${
						data.item.importance === 1 ? 'white' : data.item.color
					}`,
				}}
			></div>
		</article>
	);
}
