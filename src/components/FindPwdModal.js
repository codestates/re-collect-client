import React from "react";
import axios from "axios";
import { IsValidateEmail } from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function FindPwdModal(props) {
  const findPwdValidCheck = () => {
    const email = document.querySelector(".findPwdEmail").value;
    const error = document.querySelector(".findPwdErrorMessage");
    if (!IsValidateEmail(email)) {
      error.textContent = "이메일을 확인해주세요";
      return;
    } else {
      error.textContent = "";
      sendMailRequest(email);
    }
  };

  const sendMailRequest = (email) => {
    axios
      .post("https://api.recollect.today/auth/temp", {
        email: email,
      })
      .then((res) => {
        props.setModalMode("sentEmail");
      })
      .catch((err) => console.log(err, "에러가 발생했습니다")); // error페이지?
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
            이메일을 입력하면 <br /> 인증번호를 보내드려요.
          </p>
          <div className="inputContainer">
            <input
              className="findPwdEmail"
              type="email"
              placeholder=" 이메일"
            />
          </div>
          <div className="findPwdErrorMessage"></div>
          <button
            onClick={() => {
              findPwdValidCheck();
            }}
          >
            비밀번호 재설정
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
                props.setModalMode("login");
              }}
            >
              로그인
            </div>
          </div>
          <div className="signUperrorMessage"> </div>
        </div>
      </div>
    </div>
  );
}

export default FindPwdModal;

// findPwdModal //
// 200 ok 응답시 =>  "임시비밀번호가 전송되었습니다. 이메일을 확인해주세요" 모달
// 쿼리스트링으로 들어온 email을 출력하여 비밀번호 변경 요청하기
