export default function reduceGuestBookmark(bookmark, category) {
	const reducedBookmark = Object.entries(category).map((grp) => ({
		id: Number(grp[0]),
		title: grp[1],
		bookmarks: [],
	}));

	reducedBookmark.map((grp) => {
		bookmark.map((bmk) => {
			if (bmk.categoryId === grp.id) {
				grp.bookmarks.push(bmk);
			}
		});
	});

	return reducedBookmark;
}
