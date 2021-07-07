import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../modules/login';
import { IsValidateEmail, IsValidiatePassword } from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function LoginModal(props) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const loginValidCheck = () => {
    const email = userInfo.email;
    const pwd = userInfo.password;

    if (!IsValidateEmail(email)) {
      setErrorMessage('이메일을 확인해주세요');
      return;
    } else if (!IsValidiatePassword(pwd)) {
      setErrorMessage('비밀번호를 확인해주세요');
      return;
    } else {
      // handleLogin();
      setErrorMessage('');
      props.setModalMode('');
    }
  };

  const handleLoginInputChange = (e) => {
    const { value, name } = e.target;
    setUserInfo({
      [name]: value,
    });
  };

  // const handleLogin = () => {
  //   dispatch(login(userInfo));
  // };

  return (
    <div className="modalWrapper">
      <div className="loginModal">
        <div
          className="closeBtn"
          onClick={() => {
            props.setModalMode('');
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>

        <div className="logo"> Recollect </div>
        <div className="inputContainer">
          <input
            className="loginEmail"
            type="email"
            name="email"
            placeholder=" 이메일"
            value={userInfo.email}
            onChange={(e) => {
              handleLoginInputChange(e);
            }}
          />
          <input
            className="loginPwd"
            type="password"
            name="password"
            placeholder=" 비밀번호"
            value={userInfo.password}
            onChange={(e) => {
              handleLoginInputChange(e);
            }}
          />
        </div>
        <div className="loginErrorMessage">{errorMessage}</div>
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
              props.setModalMode('signup');
            }}
          >
            회원가입
          </div>
          <div
            onClick={() => {
              props.setModalMode('findPwd');
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
