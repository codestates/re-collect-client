import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Jump from "react-reveal/Jump";
import { useEffect, useState } from "react";

export default function UnreadAlarm({ viewHandler, unit }) {
  // const [boolean, setBoolean] = useState(false);

  // useEffect(() => {
  //   // setInterval(setBoolean(!boolean), 5000);
  //   console.log(boolean);
  // });

  return (
    <div
      className="collectview__alarm"
      onClick={() => {
        viewHandler();
      }}
    >
      <Jump>
        <FontAwesomeIcon className="jello-horizontal" icon={faBell} />
      </Jump>
      한번도 읽지않은 북마크, 클릭하여 확인하세요!
    </div>
  );
}
