import React from 'react';
import {
	IsValidateEmail
} from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function LogoutModal(props) {
	const findPwdValidCheck = () => {
		const email = document.querySelector('.findPwdEmail').value;
		const error = document.querySelector('.findPwdErrorMessage');
		if (!IsValidateEmail(email)) {
			error.textContent = '이메일을 확인해주세요';
			return;
		} else {
			error.textContent = '';
		}
	};
	return (
		<div className="modal">
			<div className="modalWrapper">
				<div className="findPwdpModal">
					<div
						className="closeBtn"
						onClick={() => {
							props.setModalMode('');
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>

					<div className="logo"> Recollect </div>
					<p>로그아웃 임시</p>
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
            로그아웃
					</button>
					<div className="buttonContainer">
						<div
							className="closeBtn"
							onClick={() => {
								props.setModalMode('');
							}}
						>
							<FontAwesomeIcon icon={faTimes} />
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
						<div className="signUperrorMessage"> </div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LogoutModal;
