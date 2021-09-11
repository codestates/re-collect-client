import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewPwd } from '../../redux/actions/findPwd';
import { IsValidiatePassword } from '../../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { setModalMode } from '../../redux/actions/setModalMode';

function SetNewPwdModal() {
	const history = useHistory();
	const { resetNewPwd } = useSelector((state)=>state.sentEmailReducer)
	const dispatch = useDispatch();
	const [pwdInfo, setPwdInfo] = useState({
		tempPwd : '',
		password1 : '',
		password2 : '',
	})

	const handleLoginInputChange = (e) => {
		const { value, name } = e.target;
		setPwdInfo({
			...pwdInfo,
			[name]: value,
		});
	};

	const signUpValidCheck = () => {
		const password1 = pwdInfo.password1;
		const password2 = pwdInfo.password2;
		const tempPwd = pwdInfo.tempPwd;
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
			dispatch(setModalMode('successSetNewPwd'));
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
							dispatch(setModalMode(''));
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>
					<div className="modal__logo"> Recollect </div>
					<div className="modal__input">
						<input
							className="tempPwd"
							name='tempPwd'
							type="password"
							onChange={handleLoginInputChange}
							placeholder="인증번호 6자리"
						/>
						<input
							className="resetPwd"
							name = 'password1'
							type="password"
							onChange={handleLoginInputChange}
							placeholder=" 새로운 비밀번호"
						/>
						<input
							className="resetPwdCheck"
							name = 'password2'
							type="password"
							onChange={handleLoginInputChange}
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
