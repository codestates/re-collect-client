import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ className }) {
  return (
    <div className="collectview__search">
      <input
        className="collectview__searchBar"
        type="text"
        placeholder="Search"
      />
      <button className="collectview__searchBtn">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
