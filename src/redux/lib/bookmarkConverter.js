export default function bookmarkConverter(bookmark, isEdit) {
	const category = bookmark.category;
	const color = bookmark.color === '' ? '#214bc8' : bookmark.color;
	const importance = bookmark.importance ? 1 : 0;

	if (isEdit) {
		const { url, text, categoryId, id } = bookmark;
		return {
			color,
			importance,
			url,
			text,
			id,
			categoryId,
			category,
		};
	} else {
		const { url, text } = bookmark;
		return {
			color,
			importance,
			url,
			text,
			category,
		};
	}
}
