import React, { useEffect } from "react";
import {
  IsValidateEmail,
  IsValidiateUsername,
  IsValidiatePassword,
} from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function DelAccountModal(props) {
  const findPwdValidCheck = () => {
    const email = document.querySelector(".findPwdEmail").value;
    const error = document.querySelector(".findPwdErrorMessage");
    if (!IsValidateEmail(email)) {
      error.textContent = "이메일을 확인해주세요";
      return;
    } else {
      error.textContent = "";
    }
  };
  return (
    <div className="modal">
      <div className="modalWrapper">
        <div className="findPwdpModal">
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
            아래 문구를 입력하고
            <br />
            계정을 삭제합니다.
          </p>
          <div className="inputContainer">
            <input
              className="findPwdEmail"
              type="email"
              placeholder=" 또만나요 리콜렉트"
            />
          </div>
          <div className="findPwdErrorMessage"></div>
          <button
            onClick={() => {
              findPwdValidCheck();
            }}
          >
            계정 삭제
          </button>
          <div className="buttonContainer">
            {/* <div
            onClick={() => {
              props.setModalMode("signup");
            }}
          >
            회원가입
          </div>
          <div
            onClick={() => {
              props.setModalMode("login");
            }}
          >
            로그인
          </div> */}
          </div>
          <div className="signUperrorMessage"> </div>
        </div>
      </div>
    </div>
  );
}

export default DelAccountModal;
