export default function SearchBar() {
  return (
    <div className="collectview__search">
      <button className="collectview__searchBtn"></button>
      <input
        className="collectview__searchBar"
        type="text"
        placeholder="search"
      />
    </div>
  );
}
