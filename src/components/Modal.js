import React from "react";
import {
  IsValidateEmail,
  IsValidiateUsername,
  IsValidiatePassword,
} from "../util/validation";

function Modal(props) {
  const isClose = (className) => {
    const popup = document.querySelector(`.${className}`);
    const background = document.querySelector(`.wrapper`);
    popup.style.display = "none";
    background.style.backgroundColor = "white";
  };
  const isOpen = (className) => {
    const popup = document.querySelector(`.${className}`);
    const background = document.querySelector(`.wrapper`);
    popup.style.display = "flex";
    background.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  };

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
      isClose("signUpModalWrapper");
      isOpen("successSignUpModalWrapper");
    }
  };

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
      isClose("loginModalWrapper");
    }
  };

  const findPwdValidCheck = () => {
    const email = document.querySelector(".findPwdEmail").value;
    const error = document.querySelector(".findPwdErrorMessage");
    if (!IsValidateEmail(email)) {
      error.textContent = "이메일을 확인해주세요";
      return;
    } else {
      error.textContent = "";
      isClose("findPwdModalWrapper");
    }
  };

  const deleteAccountCheck = () => {
    const text = document.querySelector(".deleteText").value;
    const error = document.querySelector(".deleteErrorMessage");
    if (text !== "또만나요 리콜렉트") {
      error.textContent = "입력한 문구가 일치하지 않습니다";
    } else {
      error.textContent = "";
      isClose("deleteAccountModalWrapper");
    }
  };

  return (
    <div className="wrapper">
      <div className="modalContainer">
        <div className="buttonContainer">
          <button
            onClick={() => {
              isOpen("joinModalWrapper");
            }}
          >
            모달창
          </button>
        </div>
        {/* Join-Popup */}
        <div className="joinModalWrapper">
          <div
            className="closeBtn"
            onClick={() => {
              isClose("joinModalWrapper");
            }}
          >
            <i className="fas fa-times"></i>
          </div>
          <div className="logo"> Recollect </div>
          <p>
            로그인하지 않으면 <br /> 북마크들이 사라집니다 <br /> 로그인
            하시겠습니까?
          </p>
          <button
            onClick={() => {
              isClose("joinModalWrapper");
            }}
          >
            비회원으로 계속하기
          </button>
          <button
            onClick={() => {
              isClose("joinModalWrapper");
              isOpen("signUpModalWrapper");
            }}
          >
            계정 만들기
          </button>
          <button
            onClick={() => {
              isClose("joinModalWrapper");
              isOpen("loginModalWrapper");
            }}
          >
            로그인
          </button>
        </div>
        {/* signUp-Popup */}
        <div className="signUpModalWrapper">
          <div
            className="closeBtn"
            onClick={() => {
              isClose("signUpModalWrapper");
            }}
          >
            <i className="fas fa-times"></i>
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
        {/* successSignUp-Popup */}
        <div className="successSignUpModalWrapper">
          <div
            className="closeBtn"
            onClick={() => {
              isClose("successSignUpModalWrapper");
            }}
          >
            <i className="fas fa-times"></i>
          </div>
          <div className="logo"> Recollect </div>
          <p>
            환영합니다 <br /> 가입이 완료되었습니다
          </p>
          <button
            onClick={() => {
              isClose("successSignUpModalWrapper");
              isOpen("loginModalWrapper");
            }}
          >
            로그인하고 시작하기
          </button>
        </div>

        {/* Login-Popup */}
        <div className="loginModalWrapper">
          <div
            className="closeBtn"
            onClick={() => {
              isClose("loginModalWrapper");
            }}
          >
            <i className="fas fa-times"></i>
          </div>
          <div className="logo"> Recollect </div>
          <div className="inputContainer">
            <input className="loginEmail" type="email" placeholder=" 이메일" />
            <input
              className="loginPwd"
              type="password"
              placeholder=" 비밀번호"
            />
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
                isClose("loginModalWrapper");
                isOpen("signUpModalWrapper");
              }}
            >
              회원가입
            </div>
            <div
              onClick={() => {
                isClose("loginModalWrapper");
                isOpen("findPwdModalWrapper");
              }}
            >
              비밀번호 찾기
            </div>
          </div>
        </div>
        {/* findPwd-Popup */}
        <div className="findPwdModalWrapper">
          <div
            className="closeBtn"
            onClick={() => {
              isClose("findPwdModalWrapper");
            }}
          >
            <i className="fas fa-times"></i>
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
                isClose("findPwdModalWrapper");
                isOpen("signUpModalWrapper");
              }}
            >
              회원가입
            </div>
            <div
              onClick={() => {
                isClose("findPwdModalWrapper");
                isOpen("loginModalWrapper");
              }}
            >
              로그인
            </div>
          </div>
        </div>
        {/* DeleteAccount-Popup */}
        <div className="deleteAccountModalWrapper">
          <div
            className="closeBtn"
            onClick={() => {
              isClose("deleteAccountModalWrapper");
            }}
          >
            <i className="fas fa-times"></i>
          </div>
          <p>
            아래 문구를 입력하고 <br /> 계정을 삭제합니다.
          </p>
          <div className="inputContainer">
            <input
              className="deleteText"
              type="text"
              placeholder="또만나요 리콜렉트"
            />
          </div>
          <button onClick={deleteAccountCheck}> 계정 삭제 </button>
          <div className="deleteErrorMessage"></div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
