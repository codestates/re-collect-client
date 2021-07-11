import React from "react";
import axios from "axios";
import { IsValidiatePassword } from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function SetNewPwdModal(props) {
  const signUpValidCheck = () => {
    const password1 = document.querySelector(".resetPwd").value;
    const password2 = document.querySelector(".resetPwdCheck").value;
    const tempPwd = document.querySelector(".tempPwd").value;
    const error = document.querySelector(".errorMessage");
    if (!tempPwd) {
      error.textContent = "임시비밀번호를 입력해주세요";
    } else if (!IsValidiatePassword(password1)) {
      error.textContent =
        "비밀번호는 영문 대소문자, 숫/자, 특수문자를 포함한 8글자 이상으로 만들어야 합니다.";
      return;
    } else if (!(password1 === password2)) {
      error.textContent = "비밀번호가 서로 다릅니다.";
      return;
    } else {
      error.textContent = "";
      requestNewPwd(tempPwd, password1, password2);
    }
  };

  //// 확인 필요 ////
  // 1. 발급된 임시비밀번호로 로그인이 안된다
  // 2. 새 비밀번호 요청시 501 에러
  const requestNewPwd = (tempPwd, password1, password2) => {
    const email = window.location.search.slice(1);
    // console.log(email);
    axios
      .post(
        `https://api.recollect.today/login/pwd/&email=ksyoon0718@gmail.com`,
        {
          password1,
          password2,
          tempPwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => props.setModalMode("successSetNewPwd"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal">
      <div className="modalWrapper">
        <div className="setNewPwdmodal">
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
            <input
              className="tempPwd"
              type="password"
              placeholder="임시비밀번호 6자리"
            />
            <input
              className="resetPwd"
              type="password"
              placeholder=" 새로운 비밀번호"
            />
            <input
              className="resetPwdCheck"
              type="password"
              placeholder=" 비밀번호 확인"
            />
          </div>
          <button
            onClick={() => {
              signUpValidCheck();
            }}
          >
            새 비밀번호 설정하기
          </button>
          <div className="errorMessage"> </div>
        </div>
      </div>
    </div>
  );
}

export default SetNewPwdModal;

// 카테고리input 카테고리 플레이스홀더 제거하는게 조금 더 편할 것 같은데
// Text와는 다르게 Category뒤에 깜빡거려서 낮선느낌
