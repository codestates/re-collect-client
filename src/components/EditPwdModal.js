import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IsValidiatePassword } from '../util/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { editPwd, editPwdInitialize } from '../redux/actions/editPwd';

function EditPwdModal(props) {
	// eslint-disable-next-line no-unused-vars
	const { isEditPwdSuccess, error } = useSelector((state) => state.profileReducer.profile);
	const dispatch = useDispatch();

	const [pwdInfo, setPwdInfo] = useState({
		password: '',
		newpassword: '',
		newpasswordcheck: '',
	});

	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		dispatch(editPwdInitialize());
	},[isEditPwdSuccess]);

	useEffect(() => {		
		setErrorMessage(error);
	}, [error]);

	const changePwdValidCheck = () => {
		const password = pwdInfo.password;
		const newpassword = pwdInfo.newpassword;
		const newpasswordcheck = pwdInfo.newpasswordcheck;

		if (!IsValidiatePassword(password)) {
			setErrorMessage('현재 비밀번호가 올바르지 않습니다.');
			return;
		}
		if (!IsValidiatePassword(newpassword)) {
			setErrorMessage(
				'비밀번호는 영문대소문자,숫자,특수문자를 포함한 8글자 이상으로 만들어야 합니다.'
			);
			return;
		}
		if (!(newpassword === newpasswordcheck)) {
			setErrorMessage('비밀번호가 일치하지 않습니다.');
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
	};

	useEffect (() => {
		if(isEditPwdSuccess){
			setErrorMessage('비밀번호를 변경했습니다.')
			dispatch(editPwdInitialize());
			setTimeout(() => {
				props.setModalMode('');
			}, 2000);
		}
	}, [isEditPwdSuccess])

	return (
		<div className="modalpage">
			<div className="modal">
				<div className="modal__changePwd">
					<div
						className="modal__closeBtn"
						onClick={() => {
							props.setModalMode('');
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>

					<div className="modal__logo"> Recollect </div>
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
					<div className="modal__error">{errorMessage}</div>
				</div>
			</div>
		</div>
	);
}

export default EditPwdModal;
