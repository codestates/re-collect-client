import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IsValidiatePassword} from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { editPwd } from "../modules/editProfile";
import { notify } from '../modules/notification';

function ChangePwdModal(props) {
  const state = useSelector((state) => state.profileReducer);
  const { profile } = state;
  const dispatch = useDispatch();

  const [pwdInfo, setPwdInfo] = useState({
    password: '',
    newpassword: '',
    newpasswordcheck: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   setErrorMessage(profile.error);
  // }, [profile.error]);

  const changePwdValidCheck = () => {
    const password = pwdInfo.password;
    const newpassword = pwdInfo.newpassword;
    const newpasswordcheck = pwdInfo.newpasswordcheck;

    if (!IsValidiatePassword(password)) {
      setErrorMessage('비밀번호를 확인해주세요');
      return;
    }
    if (!IsValidiatePassword(newpassword)) {
      setErrorMessage(
        '비밀번호는 영문 대소문자, 숫/자, 특수문자를 포함한 8글자 이상으로 만들어야 합니다.'
      );
      return;
    }
    if (!(newpassword === newpasswordcheck)) {
      setErrorMessage('비밀번호가 서로 다릅니다.');
      return;
    }

    handleChangePwd();
  };

  const handleChangePwdInputChange = (e) => {
    const { value, name } = e.target;
    setPwdInfo({
      ...pwdInfo,
      [name]: value,
    });
  };

  const handleChangePwd = () => {
    dispatch(editPwd(pwdInfo));
      setPwdInfo({
        ...pwdInfo,
        password: "",
        newpassword: "",
        newpasswordcheck: "",
      });
      setErrorMessage("");
      setTimeout(() => {
        props.setModalMode("");     
        }, 2000);   
      
  };

  return (
    <div className="modal">
      <div className="modalWrapper">
        <div className="changePwdModal">
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
              className="changePwd"
              type="password"
              placeholder=" 현재 비밀번호"
              name="password"
              value={pwdInfo.password || ''}
              onChange={(e) => {
                handleChangePwdInputChange(e);
              }}
            />
            <input
              className="changePwd"
              type="password"
              placeholder=" 새 비밀번호"
              name="newpassword"
              value={pwdInfo.newpassword || ''}
              onChange={(e) => {
                handleChangePwdInputChange(e);
              }}
            />
            <input
              className="changePwd"
              type="password"
              placeholder=" 비밀번호 확인"
              name="newpasswordcheck"
              value={pwdInfo.newpasswordcheck || ''}
              onChange={(e) => {
                handleChangePwdInputChange(e);
              }}
            />
          </div>
          <button
            onClick={() => {
              changePwdValidCheck();
            }}
          >
            비밀번호 변경
          </button>
          <div className="changePwdErrorMessage">{errorMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default ChangePwdModal;
