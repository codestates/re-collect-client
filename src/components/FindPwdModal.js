import React, { useEffect } from 'react';
import { IsValidateEmail } from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail } from '../redux/actions/findPwd';
import { useHistory } from 'react-router-dom';

//// To do : loading상태 => loadingPage //// 

function FindPwdModal({setModalMode}) {
	const history = useHistory();
	const { sendNewPwdMail } = useSelector((state) => state.findPwdReducer);
	const dispatch = useDispatch();
	const findPwdValidCheck = () => {
		const email = document.querySelector('.findPwdEmail').value;
		const error = document.querySelector('.modal__error');
		if (!IsValidateEmail(email)) {
			error.textContent = '이메일을 확인해주세요';
			return;
		} else {
			error.textContent = '';
			dispatch(sendEmail(email));
		}
	};

	const { isLoading, done, error } = sendNewPwdMail;
	useEffect(() => {
		if (isLoading){
			console.log('loadingggg')
			const btn = document.getElementById('requestBtn');
			btn.disabled = 'true';
			btn.textContent = '요청중입니다';
			btn.style.color = 'rgb(196, 196, 196)' 
			history.push('/loading');
		} 
		else if (done){
			setModalMode('sentEmail');
			console.log(sendNewPwdMail);
		}
		else if (error){
			console.log('error again....wtf')
			setModalMode('');
			history.push('/error');
		}
	}, [isLoading, done, error]);

	return (
		<div className='modalpage'>
			<div className='modal'>
				<div className='modal__findPwd'>
					<div
						className='modal__closeBtn'
						onClick={() => {
							setModalMode('');
						}}>
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
						id='requestBtn'
						onClick={() => {
							findPwdValidCheck();
						}}>
						인증번호 요청
					</button>
					<div className='modal__bottomTab'>
						<div
							onClick={() => {
								setModalMode('signup');
							}}>
							회원가입
						</div>
						<div
							onClick={() => {
								setModalMode('login');
							}}>
							로그인
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FindPwdModal;
