import React, { useEffect } from "react";
import {
  IsValidateEmail,
  IsValidiateUsername,
  IsValidiatePassword,
} from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function ChangePwdModal(props) {
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
    <div className="modalWrapper">
      <div className="changePwdpModal">
        <div
          className="closeBtn"
          onClick={() => {
            props.setModalMode("");
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>

        <div className="logo"> Recollect </div>
        {/* <p>
          이메일을 입력하면 <br /> 임시비밀번호를 보내드려요.
        </p> */}
        <div className="inputContainer">
          <input className="changePwd" type="password" placeholder=" 현재 비밀번호" />
          <input className="changePwd" type="password" placeholder=" 새 비밀번호" />
          <input className="changePwd" type="password" placeholder=" 비밀번호 확인" />
        </div>
        <div className="changePwdErrorMessage"></div>
        <button
          onClick={() => {
            findPwdValidCheck();
          }}
        >
          비밀번호 변경
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
        <div className="changePwderrorMessage"> </div>
      </div>
    </div>
  );
}

export default ChangePwdModal;