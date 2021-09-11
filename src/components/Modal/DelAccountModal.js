import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { delAccount } from '../../redux/actions/delAccount';
import { setModalMode } from '../../redux/actions/setModalMode';

function DelAccountModal() {
	const history = useHistory();
	const { error } = useSelector((state) => state.profileReducer.profile);

	const dispatch = useDispatch();

	const InputRef = useRef('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setErrorMessage(error);
	}, [error]);

	const delAccountValidCheck = () => {
		const delAccountmessage = InputRef.current.value;

		if (delAccountmessage !== '또 만나요 리콜렉트') {
			setErrorMessage('문구를 다시 입력해주세요.');
			return;
		}

		handleDelAccount();
	};

	const handleDelAccount = () => {
		dispatch(delAccount());
		setErrorMessage('');
		InputRef.current.value = '';

		setTimeout(() => {
			dispatch(setModalMode(''));
		}, 1000);

		setTimeout(() => {
			history.push('/');
		}, 1000);
	};

	return (
		<div className="modalpage">
			<div className="modal">
				<div className="modal__delAccount">
					<div
						className="modal__closeBtn"
						onClick={() => {
							dispatch(setModalMode(''));
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>
					<div className="modal__logo"> Recollect </div>
					<p>
            아래 문구를 입력하고
						<br />
            계정을 삭제합니다.
					</p>
					<div className="modal__input">
						<input
							className="delMessage"
							type="text"
							placeholder=" 또 만나요 리콜렉트"
							ref={InputRef}
						/>
					</div>
					<button
						onClick={() => {
							delAccountValidCheck();
						}}
					>
            계정 삭제
					</button>
					<div className="modal__error">{errorMessage}</div>
				</div>
			</div>
		</div>
	);
}

export default DelAccountModal;
