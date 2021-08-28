import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewPwd } from '../redux/actions/findPwd';
import { IsValidiatePassword } from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

function SetNewPwdModal({setModalMode}) {
	const history = useHistory();
	const { resetNewPwd } = useSelector((state)=>state.sentEmailReducer)
	const dispatch = useDispatch();
	const signUpValidCheck = () => {
		const password1 = document.querySelector('.resetPwd').value;
		const password2 = document.querySelector('.resetPwdCheck').value;
		const tempPwd = document.querySelector('.tempPwd').value;
		const error = document.querySelector('.modal__error');
		if (!tempPwd) {
			error.textContent = '인증번호를 입력해주세요';
		} else if (!IsValidiatePassword(password1)) {
			error.textContent =
        '비밀번호는 영문 대소문자, 숫/자, 특수문자를 포함한 8글자 이상으로 만들어야 합니다.';
			return;
		} else if (!(password1 === password2)) {
			error.textContent = '비밀번호가 서로 다릅니다.';
			return;
		} else {
			error.textContent = '';
			const email = window.location.search.slice(1);
			dispatch(setNewPwd(email, tempPwd, password1));
		}
	};
	const { isLoading, done, error } = resetNewPwd;
	useEffect(()=>{
		if(isLoading){
			history('/loading')
		}
		if(done){
			setModalMode('successSetNewPwd');
		}
		if(error){
			history.push('/error')
		}
	}, [ isLoading, done, error ]);

	return (
		<div className="modalpage">
			<div className="modal">
				<div className="modal__setNewPwd">
					<div
						className="modal__closeBtn"
						onClick={() => {
							setModalMode('');
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>
					<div className="modal__logo"> Recollect </div>
					<div className="modal__input">
						<input
							className="tempPwd"
							type="password"
							placeholder="인증번호 6자리"
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
					<div className="modal__error"> </div>
				</div>
			</div>
		</div>
	);
}

export default SetNewPwdModal;
