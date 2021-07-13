export default function UnreadAlarm({ viewHandler, unit }) {
  return (
    <div
      className="collectview__alarm"
      onClick={() => {
        viewHandler();
      }}
    >
      한번도 읽지않은 북마크, 클릭하여 확인하세요!
    </div>
  );
}
