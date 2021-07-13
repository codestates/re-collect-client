import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { loginInitialize, loginThunk } from '../modules/sign';
import { IsValidateEmail, IsValidiatePassword } from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function LoginModal(props) {
  const history = useHistory();
  const accessToken = localStorage.getItem('accessToken');
  const { isLogin, error } = useSelector((state) => state.signReducer.user);
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   setErrorMessage(error);
  // }, [error]);

  useEffect(() => {
    if (accessToken) {
      props.setModalMode('');
      history.push('/loading');
      setTimeout(() => {
        history.push('/collect');
      }, 2000);
    }
  }, [accessToken]);

  const loginValidCheck = () => {
    const email = loginInfo.email;
    const pwd = loginInfo.password;

    if (!IsValidateEmail(email)) {
      setErrorMessage('이메일을 확인해주세요');
      return;
    } else if (!IsValidiatePassword(pwd)) {
      setErrorMessage('비밀번호를 확인해주세요');
      return;
    } else {
      handleLogin();
    }
  };

  const handleLoginInputChange = (e) => {
    const { value, name } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleLogin = () => {
    dispatch(loginThunk(loginInfo));
  };

  return (
    <div className="modal">
      <div className="modalWrapper">
        <div className="loginModal">
          <div
            className="closeBtn"
            onClick={() => {
              dispatch(loginInitialize());
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
              value={loginInfo.email}
              onChange={(e) => {
                handleLoginInputChange(e);
              }}
            />
            <input
              className="loginPwd"
              type="password"
              name="password"
              placeholder=" 비밀번호"
              value={loginInfo.password}
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
    </div>
  );
}

export default LoginModal;
