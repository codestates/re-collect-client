import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  signupInitialize,
  signupThunk,
  emailValidation,
  usernameValidation,
  validationInitialize,
} from '../actions/signUp';
import {
  IsValidateEmail,
  IsValidiateUsername,
  IsValidiatePassword,
} from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import Creatable from 'react-select/creatable';
import emailOptions from '../util/emailOptions';
import customStyles from '../util/signUpCategoryStyle';

function SignUpModal(props) {
  const { isSignupSuccess, signupError } = useSelector(
    (state) => state.signReducer
  );

  const dispatch = useDispatch();

  const infoInitialState = {
    email: '',
    emailService: '',
    pwd: '',
    pwdCheck: '',
    username: '',
  };

  const messageInitialState = {
    email: '',
    pwd: '',
    pwdCheck: '',
    username: '',
    overall: '',
  };

  const [signUpInfo, setSignUpInfo] = useState(infoInitialState);
  const [message, setMessage] = useState(messageInitialState);

  useEffect(() => {
    const { email, username, overall } = signupError;

    function setMessageHandler(message) {
      setMessage((oldMessage) => ({
        ...oldMessage,
        [message]: message,
      }));
    }

    if (email) {
      setMessageHandler(email);
    }
    if (username) {
      setMessageHandler(username);
    }
    if (overall) {
      setMessageHandler(overall);
    }
  }, [signupError]);

  useEffect(() => {
    const { email, username } = isSignupSuccess;
    if (email) {
      setMessage((oldMessage) => ({
        ...oldMessage,
        email: '사용할 수 있는 이메일',
      }));
    }

    if (username) {
      setMessage((oldMessage) => ({
        ...oldMessage,
        username: '사용할 수 있는 유저네임',
      }));
    }
  }, [isSignupSuccess]);

  useEffect(() => {
    const { overall } = isSignupSuccess;
    if (overall) {
      props.setModalMode('successSignup');
      dispatch(signupInitialize());
    }
  }, [isSignupSuccess, dispatch, props]);

  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    const { email, username } = isSignupSuccess;

    if (name === 'email') {
      if (email) {
        dispatch(validationInitialize('email'));
      }
      setSignUpInfo({
        ...signUpInfo,
        email: value,
      });
      return;
    }

    if (username && name === 'username') {
      dispatch(validationInitialize('username'));
    }

    setSignUpInfo((state) => {
      state[name] = value;
      switch (name) {
        case 'pwd':
          if (!IsValidiatePassword(state.pwd)) {
            setMessage({
              ...message,
              pwd: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
            });
          } else {
            setMessage({
              ...message,
              pwd: '',
            });
          }
          break;
        case 'pwdCheck':
          if (state.pwd !== state.pwdCheck) {
            setMessage({
              ...message,
              pwdCheck: '비밀번호가 일치하지 않습니다.',
            });
          } else {
            setMessage({
              ...message,
              pwdCheck: '',
            });
          }
          break;
        case 'username':
          if (!IsValidiateUsername(state.username)) {
            setMessage({
              ...message,
              username: '4~16자 영문 대 소문자, 숫자를 사용하세요.',
            });
          } else {
            setMessage({
              ...message,
              username: '',
            });
          }
          break;
        default:
          break;
      }
      return state;
    });
  };

  const handleEmailServiceInputChange = (newValue, actionMeta) => {
    setSignUpInfo({
      ...signUpInfo,
      emailService: newValue,
    });
  };

  const handleSignUp = () => {
    const { email, emailService, pwd, pwdCheck, username } = signUpInfo;
    if (!email || !emailService || !pwd || !pwdCheck || !username) {
      setMessage({
        ...message,
        overall: '모든 항목은 필수입니다',
      });
      return;
    }

    if (!isSignupSuccess.email || !isSignupSuccess.username) {
      setMessage({
        ...message,
        overall: '이메일, 유저네임 중복확인을 먼저 해주세요!',
      });
      return;
    }

    dispatch(signupThunk(signUpInfo));
    setSignUpInfo(infoInitialState);
    setMessage(messageInitialState);
  };

  const handleValidiateEmail = () => {
    if (!signUpInfo.emailService.value || !signUpInfo.email) {
      setMessage({ ...message, email: '모든 항목은 필수 입니다' });
      return;
    }

    const email = signUpInfo.email + '@' + signUpInfo.emailService.value;
    if (!IsValidateEmail(email)) {
      setMessage({
        ...message,
        email: '잘못된 이메일 형식입니다.',
      });
      return;
    }
    dispatch(emailValidation(email));
  };

  const handleValidiateUsername = () => {
    const { username } = signUpInfo;
    if (username.length === 0 || !IsValidiateUsername(username)) {
      setMessage({
        ...message,
        username: '올바른 유저네임을 입력해주세요!',
      });
      return;
    }
    dispatch(usernameValidation(username));
  };

  return (
    <div className="modalpage">
      <div className="signUpmodal__modalWrapper">
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
        <div className="signUpmodal__inputContainer email">
          <input
            className="signUpmodal__inputs email"
            type="email"
            name="email"
            value={signUpInfo.email}
            placeholder=" 이메일"
            onChange={(e) => {
              handleSignUpInputChange(e);
            }}
          />
          <span className="signUpmodal__atSign">@</span>
          <Creatable
            isClearable
            options={emailOptions}
            name="emailService"
            onChange={handleEmailServiceInputChange}
            value={signUpInfo.emailService}
            styles={customStyles}
            placeholder="선택 또는 직접입력"
          />
          <button
            className="signUpmodal__duplicatedCheckBtn"
            onClick={handleValidiateEmail}
          >
            중복확인
          </button>
        </div>
        <div
          className={`signUpmodal__messageContainer ${
            isSignupSuccess.email && 'valid'
          }`}
        >
          {message.email}
        </div>
        <div className="signUpmodal__inputContainer pwd">
          <input
            className="signUpmodal__inputs pwd"
            type="password"
            name="pwd"
            value={signUpInfo.pwd}
            placeholder=" 비밀번호"
            onChange={(e) => {
              handleSignUpInputChange(e);
            }}
          />
          <FontAwesomeIcon className="signUpmodal__faLock" icon={faLock} />
        </div>
        <div className="signUpmodal__messageContainer">{message.pwd}</div>
        <div className="signUpmodal__inputContainer pwdCheck">
          <input
            className="signUpmodal__inputs pwdCheck"
            type="password"
            name="pwdCheck"
            value={signUpInfo.pwdCheck}
            placeholder=" 비밀번호 확인"
            onChange={(e) => {
              handleSignUpInputChange(e);
            }}
          />
          <FontAwesomeIcon className="signUpmodal__faLock" icon={faLock} />
          <FontAwesomeIcon className="signUpmodal__faCheck" icon={faCheck} />
        </div>
        <div className="signUpmodal__messageContainer">{message.pwdCheck}</div>
        <div className="signUpmodal__inputContainer username">
          <input
            className="signUpmodal__inputs username"
            type="text"
            name="username"
            value={signUpInfo.username}
            placeholder=" 유저네임"
            onChange={(e) => {
              handleSignUpInputChange(e);
            }}
          />
          <button
            className="signUpmodal__duplicatedCheckBtn"
            onClick={handleValidiateUsername}
          >
            중복확인
          </button>
        </div>
        <div
          className={`signUpmodal__messageContainer ${
            isSignupSuccess.username && 'valid'
          }`}
        >
          {message.username}
        </div>
        <button className="signUpmodal__createBtn" onClick={handleSignUp}>
          계정 만들기
        </button>
        <div className="signUpmodal__messageContainer overall">
          {message.overall}
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
