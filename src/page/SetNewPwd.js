import React, { useEffect } from "react";

function SetNewPwd(props) {
  useEffect(() => {
    props.setModalMode("setNewPwd");
  }, []);

  return (
    <div className="SetNewPwd__container">
      {/* <button
        onClick={() => {
          props.setModalMode("setNewPwd");
        }}
      >
        click me
      </button> */}
    </div>
  );
}

export default SetNewPwd;
