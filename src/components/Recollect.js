import React, { useEffect } from 'react';
import BigBookmark from './BigBookmark';
import { useSelector, useDispatch } from 'react-redux';
import { recollect } from '../redux/actions/getRecollect';

function Recollect() {
	const { bookmarks } = useSelector(
		(state) => state.bookmarkReducer.userBookmarks
	);
	const { unreadBookmarks } = useSelector((state) => state.recollectReducer);
	const dispatch = useDispatch();
	const accessToken = localStorage.getItem('accessToken');

	useEffect(() => {
		if (accessToken) {
			dispatch(recollect(bookmarks));
		}
	}, [bookmarks]);

	return (
		<div className='recollect'>
			<div className='recollect__title'>Recollect</div>
			<div className='recollect__bookmarks'>
				{unreadBookmarks.data.length !== 0 ? (
					unreadBookmarks.data.map((unread) => {
						return (
							<BigBookmark
								key={unread.id}
								text={unread.text}
								color={unread.color}
								importance={unread.importance}
								id={unread.id}
								url={unread.url}
							/>
						);
					})
				) : (
					<div className='recollect__skeleton'>
						<img src='logo_cut.png' className='logoPng' />
						<p>리콜렉트할 북마크가 없어요!</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default Recollect;
