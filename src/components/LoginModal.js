import React, { useEffect } from "react";
import {
  IsValidateEmail,
  IsValidiateUsername,
  IsValidiatePassword,
} from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function LoginModal(props) {
  const loginValidCheck = () => {
    const email = document.querySelector(".loginEmail").value;
    const pwd = document.querySelector(".loginPwd").value;
    const error = document.querySelector(".loginErrorMessage");
    if (!IsValidateEmail(email)) {
      error.textContent = "이메일을 확인해주세요";
      return;
    } else if (!IsValidiatePassword(pwd)) {
      error.textContent = "비밀번호를 확인해주세요";
      return;
    } else {
      error.textContent = "";
      props.setLoginMode(!props.loginMode);
    }
  };

  return (
    <div className="modalWrapper">
      <div className="loginModal">
        <div
          className="closeBtn"
          onClick={() => {
            props.setModalMode("");
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>

        <div className="logo"> Recollect </div>
        <div className="inputContainer">
          <input className="loginEmail" type="email" placeholder=" 이메일" />
          <input className="loginPwd" type="password" placeholder=" 비밀번호" />
        </div>
        <div className="loginErrorMessage"></div>
        <button
          onClick={() => {
            loginValidCheck();
          }}
        >
          로그인
        </button>
        <div className="buttonContainer">
          <div
            onClick={() => {
              props.setModalMode("signup");
            }}
          >
            회원가입
          </div>
          <div
            onClick={() => {
              props.setModalMode("findPwd");
            }}
          >
            비밀번호 찾기
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
