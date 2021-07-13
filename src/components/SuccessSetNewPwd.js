import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function SuccessSetNewPwd(props) {
  return (
    <div className="modalWrapper">
      <div className="successSignupModal">
        <div
          className="closeBtn"
          onClick={() => {
            props.setModalMode("");
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="logo"> Recollect </div>
        <p>
          새로운 비밀번호가 <br /> 설정되었습니다.
        </p>
        <Link to={`/`}>
          <button
            onClick={() => {
              props.setModalMode("login");
            }}
          >
            로그인하고 시작하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessSetNewPwd;
