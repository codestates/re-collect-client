import React from 'react';
import { IsValidateEmail } from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ExploreModal(props) {
	const isValid = () => {
		const emailForSubscribe = document.querySelector('.modal__explore__input')
			.value;
		if (!IsValidateEmail(emailForSubscribe)) {
			const error = document.querySelector('.modal__explore__error');
			error.style.display = 'flex';
		} else {
			const error = document.querySelector('.modal__explore__error');
			error.style.display = 'none';
			props.setModalMode('');
		}
	};
	return (
		<div className='modalpage'>
			<div className='modal'>
				<div className='modal__explore'>
					<div
						className='modal__closeBtn'
						onClick={() => {
							props.setModalMode('');
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>
					<div className='modal__explore__contents'>
						<p>
              아직 준비중인 서비스 입니다 <br /> 기대해주세요!
						</p>
						<input className='modal__explore__input' placeholder='Email' />
						<button onClick={isValid}>업데이트 소식받기</button>
						<div className='modal__explore__error'> 이메일을 확인해주세요 </div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExploreModal;
