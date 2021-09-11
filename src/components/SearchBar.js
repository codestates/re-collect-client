import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ setSearchInput }) {
	const handleSearchInputChange = (e) => {
		const searchInput = e.target.value;
		setSearchInput(searchInput);
	};

	return (
		<div className="collectview__search">
			<input
				className="collectview__searchBar"
				type="text"
				placeholder="북마크 찾기"
				onChange={handleSearchInputChange}
			/>
			<button className="collectview__searchBtn">
				<FontAwesomeIcon icon={faSearch} />
			</button>
		</div>
	);
}
