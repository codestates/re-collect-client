import React from 'react';
import axios from 'axios';
import { IsValidateEmail } from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FindPwdModal(props) {
  const findPwdValidCheck = () => {
    const email = document.querySelector('.findPwdEmail').value;
    const error = document.querySelector('.modal__error');
    if (!IsValidateEmail(email)) {
      error.textContent = '이메일을 확인해주세요';
      return;
    } else {
      error.textContent = '';
      sendMailRequest(email);
    }
  };

  const sendMailRequest = (email) => {
    axios
      .post('https://api.recollect.today/auth/tmp', {
        email: email,
      })
      .then((res) => {
        props.setModalMode('sentEmail');
      });
  };

  return (
    <div className='modalpage'>
      <div className='modal'>
        <div className='modal__findPwd'>
          <div
            className='modal__closeBtn'
            onClick={() => {
              props.setModalMode('');
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>

          <div className='modal__logo'> Recollect </div>
          <p>
            이메일을 입력하면 <br /> 인증번호를 보내드려요.
          </p>
          <div className='modal__input'>
            <input
              className='findPwdEmail'
              type='email'
              placeholder=' 이메일'
            />
          </div>
          <div className='modal__error'></div>
          <button
            onClick={() => {
              findPwdValidCheck();
            }}
          >
            인증번호 요청
          </button>
          <div className='modal__bottomTab'>
            <div
              onClick={() => {
                props.setModalMode('signup');
              }}
            >
              회원가입
            </div>
            <div
              onClick={() => {
                props.setModalMode('login');
              }}
            >
              로그인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindPwdModal;
