import React, { useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import {
  IsValidateEmail,
  IsValidiateUsername,
  IsValidiatePassword,
} from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function FindPwdModal(props) {
  const accessToken = localStorage.getItem("accessToken"); // accessToken 불러오기

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
      .post("https://api.recollect.today/login/pwd/forgot", {
        email: email,
      })
      .then(() => {
        console.log("이메일을 확인해주세요");
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
            이메일을 입력하면 <br /> 임시비밀번호를 보내드려요.
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

// 로직 //
// 1. 이메일을 입력하고 제출한다 (Post요청 : pwd/forgot)
// 2. 입력한 이메일에 메일이 전송된다

// 2.5 "임시비번 발급 + 이메일을 확인해주세요" 내용의 모달필요?

// 3. 해당 메일에는 임시비밀번호와, 링크가 있다. 링크클릭시 새비밀번호를 설정하는 페이지로 가진다 (인증 O)
// 4. 메일에 온 임시비밀번호와 새로운 비밀번호를 입력한다 (Post요청 : pwd/reset)

// 새로운 상태업데이트가 아닌데 modules를 사용해야하는걸까?
// action
// => type : PWD_FORGOT
// reducer
// case : PWD_FORGOT

//// 석준쌤 tempBookmark 사용법 여쭤보고 같이 적용하기
// loading : true ( 로딩페이지? )
// data

//  확인해야할것  //
// 1. Email 클릭시 새 비밀번호 설정 링크 (쿼리스트링 이메일을 붙여도 괜찮은지?)
// 2.
