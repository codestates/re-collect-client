import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { loginInitialize, loginThunk } from '../../redux/actions/signInOut';
import { IsValidateEmail, IsValidiatePassword } from '../../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { setModalMode } from '../../redux/actions/setModalMode';
function LoginModal() {
	const history = useHistory();
	const accessToken = localStorage.getItem('accessToken');
	// eslint-disable-next-line no-unused-vars
	const { isLogin, error } = useSelector((state) => state.signReducer.user);
	const dispatch = useDispatch();
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: '',
	});
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setErrorMessage(error);
	}, [error]);

	useEffect(() => {
		if (accessToken) {
			dispatch(setModalMode(''));
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
		<div className="modalpage">
			<div className="modal">
				<div className="modal__login">
					<div
						className="modal__closeBtn"
						onClick={() => {
							dispatch(loginInitialize());
							dispatch(setModalMode(''));
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>

					<div className="modal__logo"> Recollect </div>
					<div className="modal__input">
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
					<div className="modal__error">{errorMessage}</div>
					<button
						onClick={() => {
							loginValidCheck();
						}}
					>
            로그인
					</button>
					<div className="modal__bottomTab">
						<div
							onClick={() => {
								dispatch(setModalMode('signup'));
							}}
						>
              회원가입
						</div>
						<div
							onClick={() => {
								dispatch(setModalMode('findPwd'));
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
