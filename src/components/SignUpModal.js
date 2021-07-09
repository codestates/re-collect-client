import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signupInitialize, signupThunk, sigupThunk } from '../modules/signup';
import {
  IsValidateEmail,
  IsValidiateUsername,
  IsValidiatePassword,
} from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function SignUpModal(props) {
  const { isSuccess, error } = useSelector((state) => state.signupReducer);
  const dispatch = useDispatch();
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    pwd: '',
    pwdCheck: '',
    username: '',
  });

  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setErrMessage(error);
  }, [error]);

  useEffect(() => {
    if (isSuccess === false) return;
    props.setModalMode('successSignup');
    dispatch(signupInitialize());
  }, [isSuccess]);

  const signUpValidCheck = () => {
    const email = signUpInfo.email;
    const pwd = signUpInfo.pwd;
    const pwdCheck = signUpInfo.pwdCheck;
    const username = signUpInfo.username;

    if (!IsValidateEmail(email)) {
      setErrMessage('이메일을 확인해주세요');
      return;
    }
    if (!IsValidiatePassword(pwd)) {
      setErrMessage(
        '비밀번호는 영문 대소문자, 숫/자, 특수문자를 포함한 8글자 이상으로 만들어야 합니다.'
      );
      return;
    }
    if (!(pwd === pwdCheck)) {
      setErrMessage('비밀번호가 서로 다릅니다.');
      return;
    }
    if (!IsValidiateUsername(username)) {
      setErrMessage('유저네임은 4글자이상 16글자 이하로 만들수 있습니다.');
      return;
    }

    handleSignUp();
  };

  const handleSignUpInputChange = (e) => {
    setErrMessage('');

    const { name, value } = e.target;
    setSignUpInfo({
      ...signUpInfo,
      [name]: value,
    });
  };

  const handleSignUp = () => {
    dispatch(signupThunk(signUpInfo));
    setSignUpInfo({
      ...signUpInfo,
      email: '',
      pwd: '',
      pwdCheck: '',
      username: '',
    });
  };

  return (
    <div className="modalWrapper">
      <div className="signUpmodal">
        <div
          className="closeBtn"
          onClick={() => {
            props.setModalMode('');
            dispatch(signupInitialize());
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>

        <div className="logo"> Recollect </div>
        <div className="inputContainer">
          <input
            className="signUpEmail"
            type="email"
            name="email"
            value={signUpInfo.email}
            placeholder=" 이메일"
            onChange={(e) => {
              handleSignUpInputChange(e);
            }}
          />
          <input
            className="signUpPwd"
            type="password"
            name="pwd"
            value={signUpInfo.pwd}
            placeholder=" 비밀번호"
            onChange={(e) => {
              handleSignUpInputChange(e);
            }}
          />
          <input
            className="signUpPwdCheck"
            type="password"
            name="pwdCheck"
            value={signUpInfo.pwdCheck}
            placeholder=" 비밀번호 확인"
            onChange={(e) => {
              handleSignUpInputChange(e);
            }}
          />
          <input
            className="signUpUsername"
            type="text"
            name="username"
            value={signUpInfo.username}
            placeholder=" 유저네임"
            onChange={(e) => {
              handleSignUpInputChange(e);
            }}
          />
        </div>
        <button
          onClick={() => {
            signUpValidCheck();
          }}
        >
          계정 만들기
        </button>
        <div className="signUperrorMessage">{errMessage} </div>
      </div>
    </div>
  );
}

export default SignUpModal;
