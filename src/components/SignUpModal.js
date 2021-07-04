import React, { useEffect } from "react";
import {
  IsValidateEmail,
  IsValidiateUsername,
  IsValidiatePassword,
} from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function SignUpModal(props) {
  const signUpValidCheck = () => {
    const email = document.querySelector(".signUpEmail").value;
    const pwd = document.querySelector(".signUpPwd").value;
    const pwdCheck = document.querySelector(".signUpPwdCheck").value;
    const username = document.querySelector(".signUpUsername").value;
    const error = document.querySelector(".signUperrorMessage");
    if (!IsValidateEmail(email)) {
      error.textContent = "이메일을 확인해주세요";
      return;
    } else if (!IsValidiatePassword(pwd)) {
      error.textContent =
        "비밀번호는 영문 대소문자, 숫/자, 특수문자를 포함한 8글자 이상으로 만들어야 합니다.";
      return;
    } else if (!(pwd === pwdCheck)) {
      error.textContent = "비밀번호가 서로 다릅니다.";
      return;
    } else if (!IsValidiateUsername(username)) {
      error.textContent = "유저네임은 4글자이상 16글자 이하로 만들수 있습니다.";
      return;
    } else {
      error.textContent = "";
      props.setModalMode("successSignup");
    }
  };

  return (
    <div className="modalWrapper">
      <div className="signUpmodal">
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
          <input className="signUpEmail" type="email" placeholder=" 이메일" />
          <input
            className="signUpPwd"
            type="password"
            placeholder=" 비밀번호"
          />
          <input
            className="signUpPwdCheck"
            type="password"
            placeholder=" 비밀번호 확인"
          />
          <input
            className="signUpUsername"
            type="text"
            placeholder=" 유저네임"
          />
        </div>
        <button
          onClick={() => {
            signUpValidCheck();
          }}
        >
          계정 만들기
        </button>
        <div className="signUperrorMessage"> </div>
      </div>
    </div>
  );
}

export default SignUpModal;
