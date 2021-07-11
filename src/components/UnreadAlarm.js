export default function UnreadAlarm({ viewHandler, unit }) {
  return (
    <div
      className="collectview__alarm"
      onClick={() => {
        viewHandler();
      }}
    >
      Unread Bookmarks, Start To Recollect
    </div>
  );
}
