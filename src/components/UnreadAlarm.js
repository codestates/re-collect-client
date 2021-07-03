export default function UnreadAlarm({ viewHandler }) {
  return (
    <div
      className="collectview__alarm"
      onClick={() => {
        viewHandler();
      }}
    >
      7 Unread Bookmarks, Start To Recollect
    </div>
  );
}
