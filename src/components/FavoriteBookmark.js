
export default function FavoriteBookmark(props) {
  const {favorite} = props;
  return (
    <article 
      className="bigBookmark"
      style={{
        border: `1px solid ${favorite.color}`,
        background: `${favorite.importance === 1 ? favorite.color : 'white'}`,
        color: `${favorite.importance === 1 ? 'white' : 'black'}`,
      }}
    >
      {favorite.text}
      <div 
      className="bigBookmark__triangle"
      style={{
        borderRightColor: `${favorite.importance === 1 ? 'white' : favorite.color}`,
      }}
      ></div>
    </article>
  );
}