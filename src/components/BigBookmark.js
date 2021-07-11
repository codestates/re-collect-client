export default function BigBookmark({ text, color, importance }) {
  return (
    <article
      className="bigBookmark"
      style={{
        border: `1px solid ${color}`,
        background: `${importance === 1 ? color : `white`}`,
        color: `${importance === 1 ? `white` : `black`}`,
      }}
    >
      {text ? text : `이것은 북마크 입니다.`}

      <div
        className="bigBookmark__triangle"
        style={{
          borderRightColor: `${importance === 1 ? `white` : color}`,
        }}
      ></div>
    </article>
  );
}
